import fs from 'fs'
import jws from 'jws'
import jwt, { SignOptions, VerifyOptions } from 'jsonwebtoken'

import { AccessToken, RefreshToken } from 'devu-shared-modules'

import environment from '../environment'

import User from '../model/users.model'

// TODO: Replace with proper app level configs
const pathToEnv = `${__dirname}/../env/`
const authConfig = JSON.parse(fs.readFileSync(pathToEnv + 'config/auth.config.json', 'utf8'))
const signingKey = authConfig.jwt.keys[authConfig.jwt.active_key_id].private_key

function getVerificationKey(kid?: string) {
  if (!kid) return null
  if (!authConfig.jwt.keys[kid]) return null

  return authConfig.jwt.keys[kid].public_key
}

// TODO - Add jwtid to refresh tokens for revocation ability in the future
// or add rev_sig (hashed value of some fields that revoke tokens if any change)
const jwtOptions: SignOptions & VerifyOptions = {
  issuer: 'devU-auth',
  audience: ['devU-api', 'devU-client'],
  keyid: authConfig.jwt.active_key_id,
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

export function createAccessToken(user: User): string {
  const payload: AccessToken = { userId: user.id, email: user.email }
  return createToken(payload, `${environment.accessTokenValiditySeconds}s`)
}

export function createRefreshToken(user: User): string {
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
