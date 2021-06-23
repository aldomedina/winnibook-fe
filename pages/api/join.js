import { ApolloClient, InMemoryCache } from "@apollo/client";
import ADD_LOCAL from '../../apollo/mutations/local/insertJoin.gql';

export default async function handler(req, res) {

  const client = new ApolloClient({
    uri: "https://winnibook.hasura.app/v1/graphql",
    headers: {
      "x-hasura-admin-secret": `5mKusFsywFpp4U86J42skwYreZLtj0SK3nf0zsLch3ecGJl4jH8twrpZu33YC62L`,
    },
    cache: new InMemoryCache(),
  });

  if (req.method === 'POST') {

    const { data } = await client.mutate({
      mutation: ADD_LOCAL,
      variables: req.body.params
    });
    
    res.status(200).json({ id: data.insert_winnibook_locals_one.id })

  }
}