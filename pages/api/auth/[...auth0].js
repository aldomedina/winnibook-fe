import { handleAuth, handleCallback, handleLogin } from '@auth0/nextjs-auth0';

export default handleAuth({
  async login(req, res) {
    try {
      await handleLogin(req, res, {
        returnTo: process.env.BASE_URL
      });
      console.log("BASE_URL", process.env.BASE_URL);
    } catch (error) {
      res.status(error.status || 500).end(error.message);
    }
  },
  async callback(req, res) {
    try {
      await handleCallback(req, res, {
        redirectUri: process.env.BASE_URL
      });
    } catch (error) {
      res.status(error.status || 500).end(error.message);
    }
  }
});