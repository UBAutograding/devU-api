import { Request, Response, NextFunction } from 'express'

import { UserCourse as UserCourseType } from 'devu-shared-modules'

import UserCourse from '../../model/user-course.model'

import { Unknown } from '../../utils/apiResponse.utils'

export default  function(req: Request, res: Response, next: NextFunction) {

  if(!req.userCourse && !req.userCourses) return res.status(400).json(Unknown)

  const response = req.userCourse ? serialize(req.userCourse) : req.userCourses.map(serialize)

  res.status(req.statusCode).json(response)
}

function serialize(userCourse: UserCourse): UserCourseType {
  return {
    id: userCourse.id,
    userId: userCourse.userId,
    courseId: userCourse.courseId,
    level: userCourse.level,
    dropped: userCourse.dropped,
    lectureSection: userCourse.lectureSection,
    createdAt: userCourse.createdAt.toISOString(),
    updatedAt: userCourse.updatedAt.toISOString()
  }
}