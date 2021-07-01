// Libraries
import express from 'express'

// Logout Controller
import Logout from '../controller/logout.controller'

const Router = express.Router()

Router.get('/logout',Logout)

export default Router