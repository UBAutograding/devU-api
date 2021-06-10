import jwt from 'jsonwebtoken'
import jws from 'jws'
import fs from 'fs'

import environment from '../environment'

import { DeserializedToken, DeserializedRefreshToken } from 'devu-shared-modules'

// TODO: Replace with proper app level configs
const pathToEnv = `${__dirname}/../env/`
const authConfig = JSON.parse(fs.readFileSync(pathToEnv + 'config/auth.config.json', 'utf8'))
const signingKey = authConfig.jwt.keys[authConfig.jwt.active_key_id].private_key

function getVerificationKey(kid: string) {
  if (!authConfig.jwt.keys[kid]) {
    return null
  }
  return authConfig.jwt.keys[kid].public_key
}

const commonOptions = { issuer: "devU-auth", audience: ["devU-api", "devU-client"], keyid: authConfig.jwt.active_key_id }
const accessOptions = { ...commonOptions, expiresIn: `${environment.tokenExpiration}s` }
// TODO: Add jwtid to refresh tokens for revocation ability in the future
// or add rev_sig (hashed value of some fields that revoke tokens if any change)
const refreshOptions = { ...commonOptions, expiresIn: '10d' }

export function get(user: DeserializedToken) {
  const token = jwt.sign({scope: ["profile", "cse250.read"]}, signingKey, {...accessOptions, subject: user.email, algorithm: "RS256" })

  return token
}

export function authenticate(token: string): DeserializedToken | null {
  try {
    return jwt.verify(token, getVerificationKey(jws.decode(token).header.kid), {...accessOptions, algorithms: ["RS256"]})
  } catch (_err) {
    console.error(_err)
    return null
  }
}

export function createRefresh(id: number) {
  const token = jwt.sign({ id }, signingKey, {...refreshOptions, algorithm: "RS256"})

  return token
}

export function authenticateRefresh(token: string): DeserializedRefreshToken | null {
  try {
    return jwt.verify(token, getVerificationKey(jws.decode(token).header.kid), {...refreshOptions, algorithms: ["RS256"]})
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
