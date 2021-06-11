import { Strategy as SamlStrategy } from 'passport-saml'

import { renameKeys } from 'devu-shared-modules'

import environment from '../../environment'

function generateSamlStrategy() {
  const samlStrategy = new SamlStrategy(
    {
      // URL that goes from the Identity Provider -> Service Provider
      callbackUrl: `${environment.apiUrl}/login/saml/callback`,
      // URL that goes from the Service Provider -> Identity Provider
      entryPoint: environment.providers.saml.entryPoint,
      // Usually specified as `/shibboleth` from site root
      issuer: `${environment.apiUrl}/login/saml`,
      // Service Provider private key
      decryptionPvk: environment.providers.saml.encryption.privateKey,
      // Service Provider Certificate
      privateKey: environment.providers.saml.encryption.certificate,
      // Identity Provider's public key
      cert: environment.providers.saml.signing.certificate,
      identifierFormat: null,
      validateInResponseTo: true,
      disableRequestedAuthnContext: true,
      wantAssertionsSigned: true,
      acceptedClockSkewMs: 20 * 1000,
      signatureAlgorithm: 'sha256',
      digestAlgorithm: 'sha256',
    },
    function (profile: any, done: any) {
      renameKeys(environment.providers.saml.attributeMap, profile)

      return done(null, profile)
    }
  )

  return samlStrategy
}

export default generateSamlStrategy
