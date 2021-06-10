import fs from 'fs'

type Config = {
  attributeMap: Record<string, string>
  decryptionPvkPath: string
  privateKeyPath: string
  certPaths: string[]
}

type SamlConfig = {
  attributeMap: Record<string, string>
  decryptionPvk: string
  privateKey: string
  certs: string[]
}

const defaultConfig: SamlConfig = {
  attributeMap: {},
  decryptionPvk: '',
  privateKey: '',
  certs: [],
}

const pathToEnv = `${__dirname}/../../env/`

function generateSamlConfig(): SamlConfig {
  try {
    const configrationJson: Config = JSON.parse(fs.readFileSync(pathToEnv + 'config/saml.config.json', 'utf8'))

    const decryptionPvk = fs.readFileSync(pathToEnv + 'ssl/' + configrationJson.decryptionPvkPath, 'utf8')
    const privateKey = fs.readFileSync(pathToEnv + 'ssl/' + configrationJson.privateKeyPath, 'utf8')
    const certs = configrationJson.certPaths.map(certPath => fs.readFileSync(pathToEnv + certPath, 'utf8'))

    return {
      ...defaultConfig,
      ...configrationJson,
      decryptionPvk,
      privateKey,
      certs,
    }
  } catch {
    return defaultConfig
  }
}

const config = generateSamlConfig()

export default config
