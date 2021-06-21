import { Request, Response, NextFunction } from 'express'

import environment from '../environment'

import UserService from '../services/user.service'
import AuthService from '../services/auth.service'

import { samlStrategy } from '../utils/passport/saml.passport'
import { refreshCookieOptions } from '../utils/cookie.utils'

export async function callback(req: Request, res: Response, next: NextFunction) {
  try {
    const samlUser = req.user as any
    const { user } = await UserService.ensure({ email: samlUser.email, externalId: samlUser.externalId })

    const refreshToken = AuthService.createRefreshToken(user)

    res.cookie('refreshToken', refreshToken, refreshCookieOptions)
    res.redirect(environment.clientUrl)
  } catch (err) {
    next(err)
  }
}

export async function generateMetadata(req: Request, res: Response, next: NextFunction) {
  try {
    res
      .type('application/xml')
      .status(200)
      .json(
        samlStrategy.generateServiceProviderMetadata(
          environment.providers.saml.encryption.certificate,
          environment.providers.saml.signing.certificate
        )
      )
  } catch (err) {
    next(err)
  }
}

export default {
  callback,
  generateMetadata,
}
