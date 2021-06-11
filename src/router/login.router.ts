// Libraries
import express from 'express'

import controller from '../controller/login.controller'

// Middleware
import { isValidRefreshToken, saml } from '../middleware/auth.middleware'
import { checkEnabledProviders, validateDeveloper } from '../middleware/validator/login.validator'

const Router = express.Router()

/**
 * @swagger
 * /login:
 *   get:
 *     summary: Gets API auth via passing refresh token as a cookie
 */
Router.get('/', isValidRefreshToken, controller.login)
Router.get('/providers', controller.getProviders)

Router.get('/saml', checkEnabledProviders, saml)
Router.post('/developer', checkEnabledProviders, validateDeveloper, controller.developerCallback)

// TODO - should be changed to /saml/callback
Router.post('/callback', saml, controller.samlCallback)

export default Router
