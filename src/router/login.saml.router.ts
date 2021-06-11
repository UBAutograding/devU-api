// Libraries
import express from 'express'

import controller from '../controller/login.saml.controller'

import { saml } from '../middleware/auth.middleware'

const Router = express.Router()

/**
 * @swagger
 * /login/saml/callback:
 *   post:
 *     summary: Handles successful SAML authentication
 */
Router.post('/callback', saml, controller.callback)

/**
 * @swagger
 * /login/saml/callback:
 *   post:
 *     summary: Handles successful SAML authentication
 */
Router.get('/metadata', controller.meta)

export default Router
