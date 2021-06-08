import passport from 'passport'

import saml from './passport/saml.passport'

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))

passport.use(saml)
