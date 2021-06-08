import { Provider } from '../shared/types/auth.types'

import providerConfig from '../../config/providers.config.json'

export function get() {
  const { providers }: { providers: Provider[] } = providerConfig

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
