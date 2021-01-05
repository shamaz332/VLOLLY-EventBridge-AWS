import fetch from "cross-fetch"

import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
export const client = new ApolloClient({
    link: new HttpLink({
      uri: "https://qxrm5mxkmbannnopzj4u54azju.appsync-api.us-east-1.amazonaws.com/graphql", // ENTER YOUR GRAPHQL ENDPOINT HERE
      fetch,
      headers: {
        "x-api-key": "da2-i6rgtva5l5g3hao7eg7blr4m7e", // ENTER YOUR APPSYNC API KEY HERE
      },
    }),
    cache: new InMemoryCache(),
  });