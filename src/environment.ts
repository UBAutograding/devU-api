export default {
  // Database settings
  port: process.env.PORT || 3001,
  dbHost: process.env.DB_HOST || 'localhost',
  dbUsername: process.env.DB_USERNAME || 'typescript_user',
  dbPassword: process.env.DB_PASSWORD || 'password',
  database: process.env.DATABASE || 'typescript_api',

  // Logging
  logDB: process.env.LOG_DB !== undefined, // logs all sql commands for gut/fact checking endpoints

  // Auth Settings
  bypassSchoolAuth: process.env.BYPASS_SCHOOL_AUTH !== undefined, // skips school auth, works automatically on npm start
  tokenSecret: process.env.TOKEN_SECRET || 'oh_WOW_great_token_secret',
  tokenExpiration: process.env.TOKEN_EXPIRATION || '1', // expiration time in seconds
}
