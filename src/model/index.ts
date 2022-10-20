import AssignmentModel from './assignments.model'
import CourseModel from './courses.model'
import SubmissionModel from './submissions.model'
import UserModel from './users.model'
import UserCourseModel from './userCourses.model'
import SubmissionProblemScoreModel from './submissionProblemScores.model'
import SubmissionScoreModel from './submissionScores.model'

type Models =
  | AssignmentModel
  | CourseModel
  | SubmissionModel
  | UserCourseModel
  | UserModel
  | SubmissionProblemScoreModel
  | SubmissionScoreModel

export default Models
