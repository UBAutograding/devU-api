import { Request, Response, NextFunction, CookieOptions } from 'express'

import environment from '../environment'

// import UserService from '../services/user.service'
import AuthService from '../services/auth.service'
import {serviceProvider, identityProvider} from "../utils/auth/saml"
import User from '../model/users.model'

const refreshCookieOptions: CookieOptions = {
  maxAge: environment.refreshTokenValiditySeconds * 1000,
  httpOnly: true,
  secure: true,
  sameSite: true,
}

export async function authorize(req: Request, res: Response, next: NextFunction) {
  serviceProvider.create_login_request_url(identityProvider, {}, function(err, login_url, request_id) {
    if (err != null)
      return res.send(500);
    res.redirect(login_url);
  });
}

export async function callback(req: Request, res: Response, next: NextFunction) {
  serviceProvider.post_assert(identityProvider, {request_body: req.body},  function(err, saml_response) {
    if (err != null)
      return res.send(500);

    // const samlUser = req.user as any
    // const { user } = await UserService.ensure({ email: samlUser.email, externalId: samlUser.externalId })

    console.log(saml_response)
    //TODO: FIXME!!!!
    var user = new User
    user.id = 1
    const refreshToken = AuthService.createRefreshToken(user)

    res.cookie('refreshToken', refreshToken, refreshCookieOptions)
    res.redirect(environment.clientUrl)
  })
}

export async function generateMetadata(req: Request, res: Response, next: NextFunction) {
  res.type('application/xml');
  res.status(200).send(
    serviceProvider.create_metadata()
  )
}

export default {
  callback,
  generateMetadata,
  authorize
}
