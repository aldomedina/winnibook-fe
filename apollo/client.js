import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { getSession } from "@auth0/nextjs-auth0";

export const client = new ApolloClient({
  uri: "https://winnibook.hasura.app/v1/graphql",
  cache: new InMemoryCache(),
});

export const initializeClient = async (req, res, token) => {
  let session;

  if (!token) {
    const getSessionRes = await getSession(req, res);
    session = getSessionRes?.idToken;
  } else {
    session = token;
  }

  let headers = {};

  if (session) {
    headers.Authorization = "Bearer " + session
  }

  return new ApolloClient({
    link: new HttpLink({
      uri: 'https://winnibook.hasura.app/v1/graphql',
      headers: headers
    }),
    cache: new InMemoryCache(),
  })

};