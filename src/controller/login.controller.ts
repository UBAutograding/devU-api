import { Request, Response, NextFunction } from 'express'

import environment from '../environment'

import UserService from '../services/user.service'
import AuthService from '../services/auth.service'
import ProviderService from '../services/provider.service'

import { Unauthorized, Unknown } from '../utils/apiResponse.utils'

// 10 days - largely irrellivant because the JWT will expire before the cookie does
const refreshCookieOptions = { maxAge: 864000000, httpOnly: true, secure: true, sameSite: true }

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    if (req.refreshUser === undefined) return res.status(401).json(Unknown)

    const { id } = req.refreshUser

    if (!id) return res.status(401).json(Unauthorized)

    const user = await UserService.retrieve(id)

    if (!user) return res.status(401).json(Unauthorized)

    const token = AuthService.get({ email: user.email })

    req.user = user
    req.auth = { token }

    req.statusCode = 200

    next()
  } catch (err) {
    next(err)
  }
}

export function getProviders(req: Request, res: Response, next: NextFunction) {
  try {
    const providers = ProviderService.get()

    res.status(200).json(providers)
  } catch (err) {
    next(err)
  }
}

export async function samlCallback(req: Request, res: Response, next: NextFunction) {
  const samlUser = req.user as any
  const { user } = await UserService.ensure({ email: samlUser.email, schoolId: samlUser.externalId })

  const refreshToken = AuthService.createRefresh(user.id)

  res.cookie('refreshToken', refreshToken, refreshCookieOptions)
  res.redirect(environment.clientUrl)
}

export async function developerCallback(req: Request, res: Response, next: NextFunction) {
  const refreshToken = AuthService.createRefresh(1)

  res.cookie('refreshToken', refreshToken, refreshCookieOptions)
  res.redirect(environment.clientUrl)
}

export default {
  login,
  getProviders,
  samlCallback,
  developerCallback,
}
