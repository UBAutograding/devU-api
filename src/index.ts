// Libraries
import 'reflect-metadata'

import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { createConnection } from 'typeorm'
import passport from 'passport'
import cookieParser from 'cookie-parser'

import environment from './environment'
import connectionInfo from './database'

// Middleware
import router from './router'
import errorHandler from './middleware/errorHandler.middleware'

// Authentication Handlersn
import './utils/passport.utils'

const app = express()

createConnection(connectionInfo)
  .then(connection => {
    app.use(helmet())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.use(cookieParser())
    app.use(cors({ origin: environment.clientUrl, credentials: true }))
    app.use(morgan('combined'))
    app.use(passport.initialize())

    // Middleware;
    app.use('/', router)
    app.use(errorHandler)

    app.listen(environment.port, () => console.log(`API listenting at port - ${environment.port}`))
  })
  .catch(err => console.log('TypeORM connection error:', err))
