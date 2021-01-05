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
              url: "https://c2oprnwaczf43ns7rjmckoogni.appsync-api.us-east-1.amazonaws.com/graphql",
              headers: {
                  "x-api-key": "da2-4kzpsqxjwrhn7hx2axud4ezd6q"
              },
              refetchInterval: 10,
          },
      },
  ],
}