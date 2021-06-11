// Libraries
import express from 'express'

import controller from '../controller/login.controller'

// Middleware
import { isValidRefreshToken, isDeveloperEnabled, isSamlEnabled } from '../middleware/auth.middleware'

import SamlRouter from './login.saml.router'
import DeveloperRouter from './login.developer.router'

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

// Provider Routers
Router.use('/saml', isSamlEnabled, SamlRouter)
Router.use('/developer', isDeveloperEnabled, DeveloperRouter)

export default Router
