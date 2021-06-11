import { Request, Response, NextFunction, CookieOptions } from 'express'

import environment from '../environment'

import UserService from '../services/user.service'
import AuthService from '../services/auth.service'
import ProviderService from '../services/provider.service'

import { GenericResponse, Unauthorized, Unknown } from '../utils/apiResponse.utils'

const refreshCookieOptions: CookieOptions = {
  maxAge: environment.refreshTokenValiditySeconds * 1000,
  httpOnly: true,
  secure: true,
  sameSite: true,
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    if (req.refreshUser === undefined) return res.status(401).json(Unknown)

    const { userId } = req.refreshUser

    if (!userId) return res.status(401).json(Unauthorized)

    const user = await UserService.retrieve(userId)

    if (!user) return res.status(401).json(Unauthorized)

    const accessToken = AuthService.createAccessToken(user)

    res.status(200).json({ accessToken })
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
  const { user } = await UserService.ensure({ email: samlUser.email, externalId: samlUser.externalId })

  const refreshToken = AuthService.createRefreshToken(user)

  res.cookie('refreshToken', refreshToken, refreshCookieOptions)
  res.redirect(environment.clientUrl)
}

export async function developerCallback(req: Request, res: Response, next: NextFunction) {
  const { email = '', externalId = '' } = req.body

  const { user } = await UserService.ensure({ email, externalId })
  const refreshToken = AuthService.createRefreshToken(user)

  res.cookie('refreshToken', refreshToken, refreshCookieOptions)
  res.status(200).json(new GenericResponse('Login successful'))
}

export default {
  login,
  getProviders,
  samlCallback,
  developerCallback,
}
