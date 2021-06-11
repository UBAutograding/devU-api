import User from '../../src/model/users.model'

import { Token, AccessToken, RefreshToken } from 'devu-shared-modules'
declare global {
  namespace Express {
    interface Request {
      // Response Types
      user?: User
      users?: User[]
      authResponse?: Token

      // Auth Data
      currentUser?: AccessToken
      refreshUser?: RefreshToken
    }
  }
}
