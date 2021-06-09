import jwt from 'jsonwebtoken'

import environment from '../environment'

import { DeserializedToken, DeserializedRefreshToken } from 'devu-shared-modules'

const accessOptions = { expiresIn: `${environment.tokenExpiration}s` }
const refreshOptions = { expiresIn: '10d' }

export function get(user: DeserializedToken) {
  const token = jwt.sign(user, environment.jwtPrivateKey, accessOptions)

  return token
}

export function authenticate(token: string): DeserializedToken | null {
  try {
    return jwt.verify(token, environment.jwtPrivateKey)
  } catch (_err) {
    console.error(_err)
    return null
  }
}

export function createRefresh(id: number) {
  const token = jwt.sign({ id }, environment.jwtPrivateKey, refreshOptions)

  return token
}

export function authenticateRefresh(token: string): DeserializedRefreshToken | null {
  try {
    return jwt.verify(token, environment.jwtPrivateKey)
  } catch (_err) {
    console.error(_err)
    return null
  }
}

export default {
  get,
  authenticate,
  createRefresh,
  authenticateRefresh,
}
