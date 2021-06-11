import fs from 'fs'

import { AuthProvider } from 'devu-shared-modules'

import environment from '../environment'

// Returned Config Shape
type ProvidersConfig = { providers: AuthProvider[] }

const pathToEnv = `${__dirname}/../../env/`
const defaultConfig: ProvidersConfig = { providers: [] }

const DEV_AUTH_SKIP_PROVIDER: AuthProvider = {
  name: 'Developer Auth',
  route: '/login/developer',
  description: 'A user will be created for you with your provided credentials, or sign you in the user already exists.',
  method: 'post',
  body: ['email', 'externalId'],
}

function generateProvidersConfig(): ProvidersConfig {
  if (environment.bypassAuth) defaultConfig.providers.push(DEV_AUTH_SKIP_PROVIDER)

  try {
    const configrationJson: ProvidersConfig = JSON.parse(
      fs.readFileSync(pathToEnv + 'config/providers.config.json', 'utf8')
    )

    return {
      providers: [...configrationJson.providers, ...defaultConfig.providers],
    }
  } catch {
    return defaultConfig
  }
}

const config = generateProvidersConfig()

export default config
