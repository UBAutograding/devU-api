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
    user_id: userCourse.user_id,
    course_id: userCourse.course_id,
    level: userCourse.level,
    lecture_section: userCourse.lecture_section,
    createdAt: userCourse.createdAt.toISOString(),
    updatedAt: userCourse.updatedAt.toISOString()
  }
}