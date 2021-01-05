module.exports = {
  plugins: [
      {
          resolve: "gatsby-source-graphql",
          options: {
              // This type will contain the remote schema Query type
              typeName: "Lolly",
              // This is the field under which it's accessible
              fieldName: "lolly",
              // URL to query from
              url: "https://qxrm5mxkmbannnopzj4u54azju.appsync-api.us-east-1.amazonaws.com/graphql",
              headers: {
                  "x-api-key": "da2-i6rgtva5l5g3hao7eg7blr4m7e"
              },
              refetchInterval: 10,
          },
      },
  ],
}