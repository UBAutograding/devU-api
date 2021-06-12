import passport from 'passport'
import { Request, Response, NextFunction } from 'express'

import { AccessToken } from 'devu-shared-modules'

import { verifyAccessToken, validateRefreshToken } from '../services/auth.service'

import { GenericResponse, Unauthorized } from '../utils/apiResponse.utils'

function checkAuth(req: Request): [AccessToken | null, GenericResponse | null] {
  const authorization = req.headers.authorization

  if (!authorization) return [null, new GenericResponse('Missing authentication headers')]

  const [type, token] = authorization.split(' ')

  if (type !== 'Bearer') return [null, new GenericResponse('Missing Bearer in authentication header')]
  if (!token) return [null, Unauthorized]

  const deserializedToken = verifyAccessToken(token)

  if (!deserializedToken) return [null, Unauthorized]

  return [deserializedToken, null]
}

export async function isAuthorized(req: Request, res: Response, next: NextFunction) {
  const [currentUser, error] = checkAuth(req)

  if (!currentUser) return res.status(401).json(error)

  req.currentUser = currentUser

  next()
}

export async function isValidRefreshToken(req: Request, res: Response, next: NextFunction) {
  const { refreshToken = '' } = req.cookies

  if (!refreshToken) return res.status(401).json(Unauthorized)

  const deserializedToken = validateRefreshToken(refreshToken)

  if (!deserializedToken) return res.status(401).json(Unauthorized)

  req.refreshUser = deserializedToken

  next()
}

export const saml = passport.authenticate('saml', { session: false })
