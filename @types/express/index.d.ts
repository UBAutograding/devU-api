import User from '../../src/model/users.model'

import { SchoolAuth, ApiAuth, DeserializedToken, DeserializedRefreshToken } from 'devu-shared-modules'
declare global {
  namespace Express {
    interface Request {
      // Models
      user?: User
      users?: User[]

      // Auth Data
      userInfo?: SchoolAuth
      auth?: ApiAuth
      currentUser?: DeserializedToken
      refreshUser?: DeserializedRefreshToken
    }
  }
}
