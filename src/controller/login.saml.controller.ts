import { Request, Response, NextFunction, CookieOptions } from 'express'

import environment from '../environment'

import UserService from '../services/user.service'
import AuthService from '../services/auth.service'

const refreshCookieOptions: CookieOptions = {
  maxAge: environment.refreshTokenValiditySeconds * 1000,
  httpOnly: true,
  secure: true,
  sameSite: true,
}

export async function callback(req: Request, res: Response, next: NextFunction) {
  const samlUser = req.user as any
  const { user } = await UserService.ensure({ email: samlUser.email, externalId: samlUser.externalId })

  const refreshToken = AuthService.createRefreshToken(user)

  res.cookie('refreshToken', refreshToken, refreshCookieOptions)
  res.redirect(environment.clientUrl)
}

export async function meta(req: Request, res: Response, next: NextFunction) {
  res.status(200).json()

  // samlStrategy.generateServiceProviderMetadata(
  //   environment.providers.saml.encryption.certificate,
  //   environment.providers.saml.signing.certificate)
}

export default {
  callback,
  meta,
}