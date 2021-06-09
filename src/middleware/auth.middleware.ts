import passport from 'passport'

import { Request, Response, NextFunction } from 'express'

import { GenericResponse, Unauthorized } from '../utils/apiResponse.utils'

import { authenticate, authenticateRefresh } from '../services/auth.service'

export async function isUser(req: Request, res: Response, next: NextFunction) {
  const authorization = req.headers.authorization

  if (!authorization) return res.status(401).json(new GenericResponse('Missing authentication headers'))

  const [type, token] = authorization.split(' ')

  if (type !== 'Bearer') return res.status(401).json(new GenericResponse('Expected Bearer token'))
  if (!token) return res.status(401).json(Unauthorized)

  const deserializedToken = authenticate(token)

  if (!deserializedToken) return res.status(401).json(Unauthorized)

  req.currentUser = deserializedToken

  next()
}

export async function hasRefreshToken(req: Request, res: Response, next: NextFunction) {
  const { refreshToken = '' } = req.cookies

  if (!refreshToken) return res.status(401).json(Unauthorized)

  const deserializedToken = authenticateRefresh(refreshToken)

  if (!deserializedToken) return res.status(401).json(Unauthorized)

  req.refreshUser = deserializedToken

  next()
}

export const saml = passport.authenticate('saml', { session: false })
