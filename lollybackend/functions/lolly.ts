import { EventBridgeEvent, Context } from "aws-lambda";
const AWS = require("aws-sdk");
const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.LOLLY_TABLE;
const codepipeline = new AWS.CodePipeline();
// import {pipeline} from "@aws-cdk/aws-codepipeline"
export const handler = async (
  event: EventBridgeEvent<string, any>,
  context: Context
) => {
  try {
    var Pipparams = {
      name: "LollyPipiline",
    };
    if (event["detail-type"] === "createVlolly") {
      const params = {
        TableName: TABLE_NAME,
        Item: { ...event.detail },
      };

      await dynamoClient.put(params).promise();
      await codepipeline
        .startPipelineExecution(
          Pipparams,
          function (error: any, Lollydata: any) {
            if (error) {
              console.log(error);
            } else {
              console.log(Lollydata);
            }
          }
        )
        .promise();
      return event.detail;
    } else return null;
  } catch (error) {
    console.log("error", error);
    return null;
  }
};
