import jws from 'jws'
import jwt, { SignOptions, VerifyOptions } from 'jsonwebtoken'

import { AccessToken, RefreshToken } from 'devu-shared-modules'

import environment from '../environment'

import UserModel from '../model/users.model'

const signingKey = environment.keys[environment.activeKeyId].privateKey

function getVerificationKey(kid?: string) {
  if (!kid || !environment.keys[kid]) throw new Error('Invalid key id')

  return environment.keys[kid].publicKey
}

// TODO - Add jwtid to refresh tokens for revocation ability in the future
// or add rev_sig (hashed value of some fields that revoke tokens if any change)
const jwtOptions: SignOptions & VerifyOptions = {
  issuer: 'devU-auth',
  audience: ['devU-api', 'devU-client'],
  keyid: environment.activeKeyId,
}

function createToken(payload: AccessToken | RefreshToken, expiresIn: string) {
  const token = jwt.sign(payload, signingKey, {
    ...jwtOptions,
    expiresIn,
    algorithm: 'RS256',
    subject: `${payload.userId}`,
  })

  return token
}

export function createAccessToken(user: UserModel): string {
  const payload: AccessToken = { userId: user.id, email: user.email }
  return createToken(payload, `${environment.accessTokenValiditySeconds}s`)
}

export function createRefreshToken(user: UserModel): string {
  const payload = { userId: user.id }
  return createToken(payload, `${environment.refreshTokenValiditySeconds}s`)
}

function validateJwt(token: string): object | null {
  try {
    const verificationKey = getVerificationKey(jws.decode(token).header.kid)
    const payload = jwt.verify(token, verificationKey, { ...jwtOptions, algorithms: ['RS256'] })

    return payload as object
  } catch (_err) {
    return null
  }
}

export function verifyAccessToken(token: string): AccessToken | null {
  const deserializedToken = validateJwt(token)

  if (deserializedToken) return deserializedToken as AccessToken
  return null
}

export function validateRefreshToken(token: string): RefreshToken | null {
  const deserializedToken = validateJwt(token)

  if (deserializedToken) return deserializedToken as RefreshToken
  return null
}

export default {
  createAccessToken,
  createRefreshToken,
  verifyAccessToken,
  validateRefreshToken,
}
