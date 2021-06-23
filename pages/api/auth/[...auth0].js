import { handleAuth, handleCallback, handleLogin } from '@auth0/nextjs-auth0';

const afterCallback = (req, res, session, state) => {
  return session;
};

export default handleAuth({
  async login(req, res) {
    try {
      await handleLogin(req, res, {
        returnTo: process.env.BASE_URL
      });
    } catch (error) {
      res.status(error.status || 500).end(error.message);
    }
  },
  async callback(req, res) {
    try {
      await handleCallback(req, res, { 
        afterCallback,
        redirectUri: process.env.BASE_URL
      });
    } catch (error) {
      res.status(error.status || 500).end(error.message);
    }
  }
});