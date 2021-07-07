import { UserCourse } from 'devu-shared-modules'

import UserCourseModel from '../../model/user-course.model'

export function serialize(userCourse: UserCourseModel): UserCourse {
  return {
    id: userCourse.id,
    userId: userCourse.userId,
    courseId: userCourse.courseId,
    level: userCourse.level,
    dropped: userCourse.dropped,
    lectureSection: userCourse.lectureSection,
    createdAt: userCourse.createdAt.toISOString(),
    updatedAt: userCourse.updatedAt.toISOString(),
  }
}
