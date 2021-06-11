import { Request, Response, NextFunction, CookieOptions } from 'express'

import environment from '../environment'

import UserService from '../services/user.service'
import AuthService from '../services/auth.service'

import { GenericResponse } from '../utils/apiResponse.utils'

const refreshCookieOptions: CookieOptions = {
  maxAge: environment.refreshTokenValiditySeconds * 1000,
  httpOnly: true,
  secure: true,
  sameSite: true,
}

export async function callback(req: Request, res: Response, next: NextFunction) {
  const { email = '', externalId = '' } = req.body

  const { user } = await UserService.ensure({ email, externalId })
  const refreshToken = AuthService.createRefreshToken(user)

  res.cookie('refreshToken', refreshToken, refreshCookieOptions)
  res.status(200).json(new GenericResponse('Login successful'))
}

export default {
  callback,
}
