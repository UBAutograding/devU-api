import User from '../../src/model/users.model'
import UserCourse from '../../src/model/user-course.model'

import { AccessToken, RefreshToken } from 'devu-shared-modules'
declare global {
  namespace Express {
    interface Request {
      // Auth Data
      currentUser?: AccessToken // Deserialized access token
      refreshUser?: RefreshToken // Deserialized refresh token
      user?: User
      users?: User[]
      userCourse?: UserCourse
      userCourses?: UserCourse[]
      // Auth Data
      currentUser?: AccessToken // Deserialized access token
      refreshUser?: RefreshToken // Deserialized refresh token
    }
  }
}
