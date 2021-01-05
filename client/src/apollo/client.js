import fetch from "cross-fetch"

import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
export const client = new ApolloClient({
    link: new HttpLink({
      uri: "https://c2oprnwaczf43ns7rjmckoogni.appsync-api.us-east-1.amazonaws.com/graphql", // ENTER YOUR GRAPHQL ENDPOINT HERE
      fetch,
      headers: {
        "x-api-key": "da2-4kzpsqxjwrhn7hx2axud4ezd6q", // ENTER YOUR APPSYNC API KEY HERE
      },
    }),
    cache: new InMemoryCache(),
  });