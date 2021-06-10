import { Strategy as SamlStrategy } from 'passport-saml'

import { renameKeys } from 'devu-shared-modules'

import samlConfig from '../../config/saml.config'

import environment from '../../environment'

const samlStrategy = new SamlStrategy(
  {
    // URL that goes from the Identity Provider -> Service Provider
    callbackUrl: environment.callbackUrl,
    // URL that goes from the Service Provider -> Identity Provider
    entryPoint: environment.entryPoint,
    // Usually specified as `/shibboleth` from site root
    issuer: environment.issuer,
    // Service Provider private key
    decryptionPvk: samlConfig.decryptionPvk,
    // Service Provider Certificate
    privateKey: samlConfig.privateKey,
    // Identity Provider's public key
    cert: samlConfig.certs,
    identifierFormat: null,
    validateInResponseTo: true,
    disableRequestedAuthnContext: true,
    wantAssertionsSigned: true,
    acceptedClockSkewMs: 20 * 1000,
    signatureAlgorithm: 'sha256',
    digestAlgorithm: 'sha256',
  },
  function (profile: any, done: any) {
    renameKeys(samlConfig.attributeMap, profile)

    return done(null, profile)
  }
)

export default samlStrategy
