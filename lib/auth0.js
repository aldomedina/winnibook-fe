import { initAuth0 } from '@auth0/nextjs-auth0'
import config from './auth0-config'

export default initAuth0({
  baseURL: config.DOMAIN,
  issuerBaseURL: config.AUTH0_DOMAIN,
  clientSecret: config.AUTH0_CLIENT_SECRET,
  secret: config.AUTH0_CLIENT_SECRET,
})