import { AccessToken, RefreshToken } from 'devu-shared-modules'
declare global {
  namespace Express {
    interface Request {
      // Auth Data
      currentUser?: AccessToken
      refreshUser?: RefreshToken
    }
  }
}
