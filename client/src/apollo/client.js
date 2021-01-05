import fetch from "cross-fetch"

import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
export const client = new ApolloClient({
    link: new HttpLink({
      uri: "https://a6b74fqikbdmvacrgw3rwbxckq.appsync-api.us-east-1.amazonaws.com/graphql", // ENTER YOUR GRAPHQL ENDPOINT HERE
      fetch,
      headers: {
        "x-api-key": "da2-47gahivak5elrnqcknle4kjlem", // ENTER YOUR APPSYNC API KEY HERE
      },
    }),
    cache: new InMemoryCache(),
  });