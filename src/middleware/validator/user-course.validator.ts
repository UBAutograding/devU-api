import { check } from 'express-validator'

import { userCourseRoles } from 'devu-shared-modules'

import validate from './generic.validator'

const userId = check('userId').isNumeric()
const courseId = check('courseId').isNumeric()
const level = check('level')
  .isString()
  .trim()
  .isIn([ ...userCourseLevels ])
const lectureSection = check('lectureSection').isString().trim().isLength({ max: 128 }).optional({ nullable: true })
const dropped = check('dropped').isBoolean().optional()

const validator = [userId, courseId, level, lectureSection, dropped, validate]

export default validator
