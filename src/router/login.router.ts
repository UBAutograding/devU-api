// Libraries
import express from 'express'

import environment from '../environment'

import controller from '../controller/login.controller'

// Middleware
import { isValidRefreshToken, isRefreshNearingExpiration } from '../middleware/auth.middleware'

import SamlRouter from './login.saml.router'
import DeveloperRouter from './login.developer.router'

const Router = express.Router()

/**
 * @swagger
 * /login:
 *   get:
 *     summary: Gets access token by via refresh token (called on client bootstrap)
 */
Router.get('/', isValidRefreshToken, isRefreshNearingExpiration, controller.login)

/**
 * @swagger
 * /login/refresh:
 *   get:
 *     summary: Gets the user a new access token (usually done so when their access token has expire or will expire soon)
 */
Router.get('/refresh', isValidRefreshToken, controller.login)

/**
 * @swagger
 * /login/providers:
 *   get:
 *     summary: Gets a list of availible authentication providers
 */
Router.get('/providers', controller.getProviders)

// Provider Routers
if (environment.providers.saml.enabled) Router.use('/saml', SamlRouter)
if (environment.providers.devAuth.enabled) Router.use('/developer', DeveloperRouter)

export default Router
