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

/**
 * @swagger
 * /login/providers:
 *   get:
 *     summary: Gets a list of availible authentication providers
 */
Router.get('/providers', controller.getProviders)

/**
 * @swagger
 * /login/saml:
 *   get:
 *     summary: Redirection endpoint for saml provider
 */
Router.get('/saml', checkEnabledProviders, saml)

/**
 * @swagger
 * /login/saml/callback:
 *   post:
 *     summary: Handles successful SAML authentication
 */
Router.post('/saml/callback', saml, controller.samlCallback)

/**
 * @swagger
 * /login/saml/callback:
 *   post:
 *     summary: Handles successful SAML authentication
 */
Router.get('/saml/metadata', checkEnabledProviders, controller.samlMeta)

/**
 * @swagger
 * /login/developer:
 *   post:
 *     summary: NOT IN PRODUCTION. Gives a way for developers to log in while developing locally
 */
Router.post('/developer', checkEnabledProviders, validateDeveloper, controller.developerCallback)

export default Router
