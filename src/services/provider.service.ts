import environment from '../environment'

import { Provider } from '../shared/types/auth.types'

import providerConfig from '../../config/providers.config.json'

const DEV_AUTH_SKIP_PROVIDER = {
  name: 'Developer Auth',
  route: '/login/developer',
  method: 'post',
  body: ['name', 'id'],
}

if (environment.bypassAuth) providerConfig.providers.push(DEV_AUTH_SKIP_PROVIDER)

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
