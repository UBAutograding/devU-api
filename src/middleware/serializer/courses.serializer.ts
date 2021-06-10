import { Request, Response, NextFunction } from 'express'

import Course from '../../model/courses.model'
import CourseType from '../../shared/types/course.type'

import { Unknown } from '../../utils/apiResponse.utils'

export default function(req: Request, res: Response, next: NextFunction) {
  // No data applied at the controller level
  if (!req.course && !req.courses) return res.status(400).json(Unknown)

  const response = req.course ? serialize(req.course) : req.courses.map(serialize)

  res.status(req.statusCode).json(response)
}

function serialize(course: Course): CourseType {
  return {
    id: course.id,
    name: course.name,
    semester: course.semester,
    number: course.number,
    start_date: course.start_date.toISOString(),
    end_date: course.end_date.toISOString(),
    createdAt: course.createdAt.toISOString(),
    updatedAt: course.updatedAt.toISOString(),
    deletedAt: course.deletedAt.toISOString(),
  }
}
