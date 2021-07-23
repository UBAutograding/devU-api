import AssignmentModel from './assignments.model'
import AssignmentSectionModel from './assignmentSection.model'
import CourseModel from './courses.model'
import SubmissionModel from './submissions.model'
import UserModel from './users.model'
import UserCourseModel from './userCourses.model'
import CourseSectionModel from './courseSection.model'

type Models = AssignmentModel | CourseModel | SubmissionModel | UserCourseModel | UserModel | AssignmentSectionModel | CourseSectionModel

export default Models
