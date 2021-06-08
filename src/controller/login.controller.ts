import { Request, Response, NextFunction } from 'express'

import environment from '../environment'

import UserService from '../services/user.service'
import AuthService from '../services/auth.service'
import ProviderService from '../services/provider.service'

import { Unknown } from '../utils/apiResponse.utils'

export function get(req: Request, res: Response, next: NextFunction) {
  try {
    const providers = ProviderService.get()

    res.status(200).json(providers)
  } catch (err) {
    next(err)
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    if (req.userInfo === undefined) return res.status(200).json(Unknown)

    const { user, isNewUser } = await UserService.ensure(req.userInfo)
    const auth = await AuthService.get({ email: user.email })

    req.user = user
    req.auth = auth

    req.statusCode = isNewUser ? 201 : 200

    next()
  } catch (err) {
    next(err)
  }
}

export async function callback(req: Request, res: Response, next: NextFunction) {
  const samlUser = req.user as any
  const { token: jwt } = AuthService.get({ email: samlUser.email })

  res.cookie('jwt', jwt)

  res.redirect(environment.clientUrl)
}

export default {
  get,
  login,
  callback,
}
