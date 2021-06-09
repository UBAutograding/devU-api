const apiUrl = process.env.API_URL || `http://localhost:${process.env.PORT}`

export default {
  // API & Client Callback URL
  apiUrl,
  clientUrl: process.env.CLIENT_URL || 'http://localhost:9000',

  // Database settings
  port: process.env.PORT || 3001,
  dbHost: process.env.DB_HOST || 'localhost',
  dbUsername: process.env.DB_USERNAME || 'typescript_user',
  dbPassword: process.env.DB_PASSWORD || 'password',
  database: process.env.DATABASE || 'typescript_api',

  // Logging
  logDB: process.env.LOG_DB !== undefined, // logs all sql commands for gut/fact checking endpoints

  // Auth Settings
  bypassAuth: process.env.BYPASS_AUTH !== undefined, // skips school auth, works automatically on npm start
  jwtPrivateKey: process.env.JWT_PRIVATE_KEY || 'private_key',
  jwtPublicKey: process.env.JWT_PUBLIC_KEY || 'public_key',
  tokenExpiration: process.env.TOKEN_EXPIRATION || '600', // expiration time in seconds (10 minutes)

  // Auth Provider Settings
  callbackUrl: process.env.CALLBACK_URL || `${apiUrl}/login/callback`,
  entryPoint: process.env.ENTRY_POINT || 'https://samltest.id/idp/profile/SAML2/Redirect/SSO',
  issuer: process.env.ISSUER || `${apiUrl}/shibboleth`,
}
