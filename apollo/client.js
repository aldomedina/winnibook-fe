import { ApolloClient, InMemoryCache } from "@apollo/client";

console.log(process.env.NEXT_PUBLIC_REACT_APP_FAUNA_SECRET);

export const client = new ApolloClient({
  uri: "https://winnibook.hasura.app/v1/graphql",
  headers: {
    "x-hasura-admin-secret": `5mKusFsywFpp4U86J42skwYreZLtj0SK3nf0zsLch3ecGJl4jH8twrpZu33YC62L`,
  },
  cache: new InMemoryCache(),
});