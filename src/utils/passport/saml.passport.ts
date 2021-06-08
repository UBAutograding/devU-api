import fs from 'fs'
import { Strategy as SamlStrategy } from 'passport-saml'

import environment from '../../environment'

import { renameKeys } from '../../shared/utils/object.utils'

// This will break without the json, gotta figure out a better way to do this
import configuration from '../../../env/config/saml.config.json'

const pathToEnv = `${__dirname}/../../../env/`

const samlStrategy = new SamlStrategy(
  {
    // URL that goes from the Identity Provider -> Service Provider
    callbackUrl: environment.callbackUrl,
    // URL that goes from the Service Provider -> Identity Provider
    entryPoint: environment.entryPoint,
    // Usually specified as `/shibboleth` from site root
    issuer: environment.issuer,
    // Service Provider private key
    decryptionPvk: fs.readFileSync(pathToEnv + configuration.decryptionPvkPath, 'utf8'),
    // Service Provider Certificate
    privateKey: fs.readFileSync(pathToEnv + configuration.privateKey, 'utf8'),
    // Identity Provider's public key
    cert: configuration.cert.map(certPath => fs.readFileSync(pathToEnv + certPath, 'utf8')),
    identifierFormat: null,
    validateInResponseTo: true,
    disableRequestedAuthnContext: true,
    wantAssertionsSigned: true,
    acceptedClockSkewMs: 20 * 1000,
    signatureAlgorithm: 'sha256',
    digestAlgorithm: 'sha256',
  },
  function (profile: any, done: any) {
    renameKeys(configuration.attributeMap, profile)

    return done(null, profile)
  }
)

export default samlStrategy
