import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { getSession } from "@auth0/nextjs-auth0";

export const client = new ApolloClient({
  uri: "https://winnibook.hasura.app/v1/graphql",
  cache: new InMemoryCache(),
});

export const initializeClient = async (req, res) => {

  const session = await getSession(req, res);

  let headers = {};

  if (session?.idToken) {
    headers.Authorization = "Bearer " + session.idToken
    console.log(session.idToken);
  }

  return new ApolloClient({
    link: new HttpLink({
      uri: 'https://winnibook.hasura.app/v1/graphql',
      headers: headers
    }),
    cache: new InMemoryCache(),
  })

};