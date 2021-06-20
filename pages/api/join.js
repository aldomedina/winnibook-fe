import { client } from '../../apollo/client';
import ADD_LOCAL from '../../apollo/mutations/local/insertJoin.gql';

export default async function handler(req, res) {
  if (req.method === 'POST') {

    console.log(req.body.params);

    const { data } = await client.mutate({
      mutation: ADD_LOCAL,
      variables: req.body.params
    });
    
    res.status(200).json({ id: insert_winnibook_locals_one.id })

  }
}