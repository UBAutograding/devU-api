export function get() {
  // TODO - make this configurable via some json
  return [{ name: 'MyUB', route: '/login/saml' }]
}

export function validate(providerRoute: string) {
  const providers = get()

  const providerRoutes = providers.map(p => p.route)

  return providerRoutes.includes(providerRoute)
}

export default {
  get,
  validate,
}
