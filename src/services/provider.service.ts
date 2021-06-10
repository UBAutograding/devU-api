import providerConfig from '../config/providers.config'

export function get() {
  const { providers } = providerConfig

  return providers
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
