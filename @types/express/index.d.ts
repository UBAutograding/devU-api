import User from '../../src/model/users.model'
import Assignment from '../../src/model/assignments.model'
import Course from '../../src/model/courses.model'

declare global {
  namespace Express {
    interface Request {
      user?: User
      users?: User[]
      assignment?: Assignment
      assignments?: Assignment[]
      course?: Course
      courses?: Course[]
    }
  }
}
