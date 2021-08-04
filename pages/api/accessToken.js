import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function getAccessToken(req, res) {
  
  try {
    const accessToken = await getSession(req, res);

    res.status(200).json(accessToken.idToken);
    
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
  
});