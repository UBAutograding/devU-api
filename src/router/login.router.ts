// Libraries
import express from 'express'

import controller from '../controller/login.controller'

// Middleware
import { hasRefreshToken, saml } from '../middleware/auth.middleware'
import { checkEnabledProviders } from '../middleware/validator/login.validator'
import { loginSerializer } from '../middleware/serializer/users.serializer'

const Router = express.Router()

/**
 * @swagger
 * /login:
 *   get:
 *     summary: Gets API auth via passing refresh token as a cookie
 */
Router.get('/', hasRefreshToken, controller.login, loginSerializer)
Router.get('/providers', controller.getProviders)

Router.get('/saml', checkEnabledProviders, saml)
Router.get('/developer', checkEnabledProviders, controller.developerCallback)

// TODO - should be changed to /saml/callback
Router.post('/callback', saml, controller.samlCallback)

export default Router
