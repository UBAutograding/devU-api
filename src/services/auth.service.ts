import jwt from 'jsonwebtoken'

import environment from '../environment'

import { SchoolAuth, DeserializedToken } from '../shared/types/auth.types'

export function verifySchoolAuth(token: string): SchoolAuth {
  // TODO - check schools auth && return schoolId (externalId)
  return {
    schoolId: '',
    email: '',
  }
}

export function get(user: DeserializedToken) {
  const tokenOptions = { expiresIn: `${environment.tokenExpiration}s` }
  const token = jwt.sign(user, environment.tokenSecret, tokenOptions)

  return { token }
}

export function authenticate(token: string): DeserializedToken | null {
  try {
    return jwt.verify(token, environment.tokenSecret)
  } catch (_err) {
    console.error(_err)
    return null
  }
}

export default {
  verifySchoolAuth,
  get,
}
