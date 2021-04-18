import { ApolloClient, InMemoryCache } from "@apollo/client";

console.log(process.env.NEXT_PUBLIC_REACT_APP_FAUNA_SECRET);

export const client = new ApolloClient({
  uri: "https://graphql.fauna.com/graphql",
  headers: {
    authorization: `Bearer ${process.env.NEXT_PUBLIC_REACT_APP_FAUNA_SECRET}`,
  },
  cache: new InMemoryCache(),
});