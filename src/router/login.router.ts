// Libraries
import express from 'express'

import controller from '../controller/login.controller'

// Middleware
import { schoolAuthentication, saml } from '../middleware/auth.middleware'
import { checkEnabledProviders } from '../middleware/validator/login.validator'
import { loginSerializer } from '../middleware/serializer/users.serializer'

const Router = express.Router()

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Gets API auth via passing school auth
 */
Router.get('/', controller.get)

Router.get('/saml', checkEnabledProviders, saml)

// TODO - should be changed to /saml/callback
Router.post('/callback', saml, controller.callback)

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Gets API auth via passing school auth
 */
Router.post('/', schoolAuthentication, controller.login, loginSerializer)

export default Router
