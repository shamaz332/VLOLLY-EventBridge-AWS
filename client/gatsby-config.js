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
              url: "https://a6b74fqikbdmvacrgw3rwbxckq.appsync-api.us-east-1.amazonaws.com/graphql",
              headers: {
                  "x-api-key": "da2-47gahivak5elrnqcknle4kjlem"
              },
              refetchInterval: 10,
          },
      },
  ],
}