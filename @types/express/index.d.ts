import UserModel from '../../src/model/users.model'

import { AccessToken, RefreshToken } from 'devu-shared-modules'
declare global {
  namespace Express {
    interface Request {
      // Response Types
      user?: UserModel
      users?: UserModel[]

      // Auth Data
      currentUser?: AccessToken
      refreshUser?: RefreshToken
    }
  }
}
