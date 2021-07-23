import AssignmentModel from './assignments.model'
import AssignmentSectionModel from './assignmentSections.model'
import CourseModel from './courses.model'
import SubmissionModel from './submissions.model'
import UserModel from './users.model'
import UserCourseModel from './userCourses.model'
import CourseSectionModel from './courseSections.model'

type Models = AssignmentModel | CourseModel | SubmissionModel | UserCourseModel | UserModel | AssignmentSectionModel | CourseSectionModel

export default Models
