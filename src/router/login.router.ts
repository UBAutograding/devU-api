// Libraries
import express from 'express'

// Middleware
import { schoolAuthentication } from '../middleware/auth.middleware'

import { loginSerializer } from '../middleware/serializer/users.serializer'

// Controller - Idk if I want to reuse the users controller here :/
// But for proof of concept it's fine
import UserController from '../controller/users.controller'

const Router = express.Router()

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Gets API auth via passing school auth
 */
Router.post('/', schoolAuthentication, UserController.login, loginSerializer)

export default Router
