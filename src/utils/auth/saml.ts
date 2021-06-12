import saml2 from "saml2-js"

import environment from '../../environment'

export var serviceProvider: saml2.ServiceProvider
export var identityProvider: saml2.IdentityProvider

var serviceProviderOptions: saml2.ServiceProviderOptions = {
  entity_id: `${environment.apiUrl}/login/saml/metadata`,
  private_key: environment.providers.saml.signing.privateKey,
  certificate: environment.providers.saml.signing.certificate,
  assert_endpoint: `${environment.apiUrl}/login/saml/callback`,
  sign_get_request: true,
  allow_unencrypted_assertion: false,
  notbefore_skew: 20
};

var identityProviderOptions: saml2.IdentityProviderOptions = {
  sso_login_url: environment.providers.saml.entryPoint,
  sso_logout_url: "unused?",
  certificates: environment.providers.saml.idpCerts,
  sign_get_request: true,
  allow_unencrypted_assertion: false
}


function initializeSamlProvider() {
  identityProvider = new saml2.IdentityProvider(identityProviderOptions);
  serviceProvider = new saml2.ServiceProvider(serviceProviderOptions);
}

// TODO: FIXME - This implementation is awful and needs to be more robust
// Resolve single element arrays up a level where possible for all fields
export const renameKeys = (keysMap: Record<string, string>, obj: saml2.SAMLAssertResponse) => {
  if (!obj.user.attributes) return

  for (let oldKey of Object.keys(keysMap)) {
    const newKey = keysMap[oldKey]

    if (!obj.user.attributes[oldKey]) continue

    obj.user.attributes[newKey] = obj.user.attributes[oldKey][0]
    delete obj.user.attributes[oldKey]
  }
  return obj.user.attributes
}

if (environment.providers.saml.enabled) initializeSamlProvider()

export default initializeSamlProvider
