// Libraries
import express from 'express'

import controller from '../controller/login.saml.controller'

import { saml } from '../middleware/auth.middleware'

const Router = express.Router()

/**
 * @swagger
 * /login/saml:
 *   get:
 *     summary: Redirects to external SAML auth server
 */
Router.get('/', saml)

/**
 * @swagger
 * /login/saml/callback:
 *   post:
 *     summary: Handles successful SAML authentication and is called from SAML auth server
 */
Router.post('/callback', saml, controller.callback)

/**
 * @swagger
 * /login/saml/callback:
 *   post:
 *     summary: Gets meta SAML infomation (usually accessed by SAML server)
 */
Router.get('/metadata', controller.generateMetadata)

export default Router
