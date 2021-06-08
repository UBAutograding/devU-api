import passport from 'passport'

import { Request, Response, NextFunction } from 'express'

import environment from '../environment'

import { GenericResponse, Unauthorized } from '../utils/apiResponse.utils'

import { verifySchoolAuth, authenticate } from '../services/auth.service'

export async function schoolAuthentication(req: Request, res: Response, next: NextFunction) {
  const { schoolToken, schoolId } = req.body

  if (environment.bypassSchoolAuth && schoolId) {
    req.userInfo = { schoolId, email: '' }

    return next()
  }

  if (!schoolToken) return res.status(401).json(Unauthorized)

  req.userInfo = await verifySchoolAuth(schoolToken)

  if (!req.userInfo.schoolId || !req.userInfo.email) return res.status(401).json(Unauthorized)

  next()
}

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

export const saml = passport.authenticate('saml', { session: false })
