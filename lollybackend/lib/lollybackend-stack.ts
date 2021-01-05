import * as cdk from "@aws-cdk/core";
import * as appsync from "@aws-cdk/aws-appsync";
import * as ddb from "@aws-cdk/aws-dynamodb";
import * as lambda from "@aws-cdk/aws-lambda";
import * as events from "@aws-cdk/aws-events";
import * as targets from "@aws-cdk/aws-events-targets";
import * as CodePipeline from "@aws-cdk/aws-codepipeline";
import * as CodePipelineAction from "@aws-cdk/aws-codepipeline-actions";
import * as CodeBuild from "@aws-cdk/aws-codebuild";
import {
  Effect,
  PolicyStatement,
  Role,
  ServicePrincipal,
} from "@aws-cdk/aws-iam";
import * as s3 from "@aws-cdk/aws-s3";
import * as s3Deployment from "@aws-cdk/aws-s3-deployment";
import * as cloudfront from "@aws-cdk/aws-cloudfront";
import * as origins from "@aws-cdk/aws-cloudfront-origins";
import {
  LOLLY_EVENT_SOURCE,
  requestTemplate,
  responseTemplate,
} from "../functions/template";
export class LollybackendStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //-----API-----

    const api = new appsync.GraphqlApi(this, "lollyAPi", {
      name: "Vlolly",
      schema: appsync.Schema.fromAsset("graphql/schema.gql"),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,
        },
      },
      logConfig: { fieldLogLevel: appsync.FieldLogLevel.ALL },
      xrayEnabled: true,
    });

    //-----Table-----

    const lollyTable = new ddb.Table(this, "lollyTable", {
      billingMode: ddb.BillingMode.PAY_PER_REQUEST,
      partitionKey: {
        name: "id",
        type: ddb.AttributeType.STRING,
      },
    });
    //-----Set dynamoDb as Datasource for API & It will use for listing

    const lollydynamoDS = api.addDynamoDbDataSource(
      "lollydynamoDS",
      lollyTable
    );

    //----Set HTTP data source for Api & it will use for Mutations

    const httpEventTriggerDs = api.addHttpDataSource(
      "httpEventTriggerDs",
      "https://events." + this.region + ".amazonaws.com/", // This is the ENDPOINT for eventbridge.
      {
        name: "lollyhttpsforeventas",
        description: "From Appsync to Eventbridge",
        authorizationConfig: {
          signingRegion: this.region,
          signingServiceName: "events",
        },
      }
    );
    //-----granting default bus-----

    events.EventBus.grantPutEvents(httpEventTriggerDs);

    //-----Appsync resolvers-----

    //----Query----

    lollydynamoDS.createResolver({
      typeName: "Query",
      fieldName: "listVlolly",
      requestMappingTemplate: appsync.MappingTemplate.dynamoDbScanTable(),
      responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultList(),
    });

    //-----Mutations----

    const mutations = ["createVlolly", "deleteVlolly"];
    mutations.forEach((mutation) => {
      let details = `\\\"id\\\": \\\"$ctx.args.id\\\"`;

      if (mutation === "createVlolly") {
        details = `\\\"id\\\": \\\"$ctx.args.lolly.id\\\", \\\"receiver\\\": \\\"$ctx.args.lolly.receiver\\\" , \\\"message\\\": \\\"$ctx.args.lolly.message\\\", \\\"sender\\\": \\\"$ctx.args.lolly.sender\\\", \\\"top\\\": \\\"$ctx.args.lolly.top\\\", \\\"middle\\\": \\\"$ctx.args.lolly.middle\\\", \\\"bottom\\\": \\\"$ctx.args.lolly.bottom\\\"`;
      } else if (mutation === "deleteVlolly") {
        details = `\\\"id\\\": \\\"$ctx.args.lollyId\\\"`;
      }
      httpEventTriggerDs.createResolver({
        typeName: "Mutation",
        fieldName: mutation,
        requestMappingTemplate: appsync.MappingTemplate.fromString(
          requestTemplate(details, mutation)
        ),
        responseMappingTemplate: appsync.MappingTemplate.fromString(
          responseTemplate()
        ),
      });
    });
    //----Lambda ----

    const lollyLambda = new lambda.Function(this, "lollyLambda", {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: "lolly.handler",
      code: lambda.Code.fromAsset("functions"),
    });

    const lollyRule = new events.Rule(this, "lollyRule", {
      eventPattern: {
        source: [LOLLY_EVENT_SOURCE],
        detailType: [...mutations],
      },
      targets: [new targets.LambdaFunction(lollyLambda)],
    });

    // -----print out the AppSync GraphQL endpoint to the terminal-----
    new cdk.CfnOutput(this, "GraphQLAPIURL", {
      value: api.graphqlUrl,
    });

    // -----print out the AppSync API Key to the terminal-----
    new cdk.CfnOutput(this, "GraphQLAPIKey", {
      value: api.apiKey || "",
    });

    // -----print out the stack region-----
    new cdk.CfnOutput(this, "Stack Region", {
      value: this.region,
    });

    // -----enable the Lambda function to access the DynamoDB table (using IAM)  -----
    lollyTable.grantFullAccess(lollyLambda);

    // ----- Create an environment variable that we will use in the function code  -----
    lollyLambda.addEnvironment("LOLLY_TABLE", lollyTable.tableName);

    // ----- Permessions  -----

    const role = new Role(this, "roleforlambda", {
      assumedBy: new ServicePrincipal("lambda.amazonaws.com"),
    });

    const policy = new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ["lambda:*", "codepipeline:*", "dynamodb:*", "logs:*"],
      resources: ["*"],
    });
    role.addToPolicy(policy);

    //----Deploy gatsby on S3 bucket----
    const lollyBucket = new s3.Bucket(this, "lollyBucket", {
      versioned: true,
      websiteIndexDocument: "index.html",
      publicReadAccess: true,
    });
    lollyBucket.grantReadWrite(lollyLambda);

    //----Distribution----

    const lollyDist = new cloudfront.Distribution(this, "lollyDist", {
      defaultBehavior: {
        origin: new origins.S3Origin(lollyBucket),
      },
      enableIpv6: true,
    });

    new s3Deployment.BucketDeployment(this, "", {
      sources: [s3Deployment.Source.asset("../client/public")],
      destinationBucket: lollyBucket,
      distribution: lollyDist,
    });

    new cdk.CfnOutput(this, "lollyURL", {
      value: lollyDist.domainName,
    });


    
  }
}
