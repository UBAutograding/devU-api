// Libraries
import express from 'express'

import controller from '../controller/login.saml.controller'

const Router = express.Router()

/**
 * @swagger
 * /login/saml:
 *   get:
 *     summary: Redirection endpoint for saml provider
 */
Router.get('/', controller.authorize)

/**
 * @swagger
 * /login/saml/callback:
 *   post:
 *     summary: Handles successful SAML authentication
 */
Router.post('/callback', controller.callback)

/**
 * @swagger
 * /login/saml/callback:
 *   post:
 *     summary: Handles successful SAML authentication
 */
Router.get('/metadata', controller.generateMetadata)

export default Router
