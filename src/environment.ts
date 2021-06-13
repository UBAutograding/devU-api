import config from 'config'

type Keys = {
  privateKey: string
  publicKey: string
}

type Certificate = {
  certificate: string
  privateKey: string
}

type Saml = {
  name: string
  enabled: boolean
  attributeMap: Record<string, string>
  entryPoint: string
  idpCerts: string[]
  encryption: Certificate
  signing: Certificate
}

type DevAuth = {
  enabled: boolean
}

type Providers = {
  saml: Saml
  devAuth: DevAuth
}

function load(path: string): any {
  if (!config.has(path)) return false

  return config.get(path)
}

const scheme = (process.env.SCHEME || load('api.scheme') || 'http') as string
const host = (process.env.HOST || load('api.host') || 'localhost') as string
const port = (process.env.PORT || load('api.port') || 3001) as number

const apiUrl = `${scheme}://${host}:${port}`

// prettier-ignore
const refreshTokenExp = process.env.REFRESH_TOKEN_VALIDITY_SECONDS || load('auth.jwt.refreshTokenValiditySeconds') || 864000
const accessTokenExp = process.env.ACCESS_TOKEN_VALIDITY_SECONDS || load('auth.jwt.accessTokenValiditySeconds') || 600

const environment = {
  port,
  apiUrl,
  clientUrl: (process.env.CLIENT_URL || load('api.clientUrl') || 'http://localhost:9000') as string,

  // Database settings
  dbHost: (process.env.DB_HOST || load('database.host') || 'localhost') as string,
  dbUsername: (process.env.DB_USERNAME || load('database.username') || 'typescript_user') as string,
  dbPassword: (process.env.DB_PASSWORD || load('database.password') || 'password') as string,
  database: (process.env.DATABASE || load('database.database') || 'typescript_api') as string,

  // Logging
  logDB: (process.env.LOG_DB !== undefined || load('logging.db')) as boolean, // logs all sql commands for gut/fact checking endpoints

  // Auth Settings
  activeKeyId: process.env.ACTIVE_KEY_ID || (config.get('auth.jwt.activeKeyId') as string),
  keys: config.get('auth.jwt.keys') as Record<string, Keys>,
  accessTokenValiditySeconds: parseInt(accessTokenExp),
  refreshTokenValiditySeconds: parseInt(refreshTokenExp),

  // BE CAREFUL WITH PROVIDERS - THEY'RE NOT TOTALLY TYPE SAFE UNLESS PROPERLY CONFIGURED
  providers: config.get('auth.providers') as Providers,
}

export default environment
