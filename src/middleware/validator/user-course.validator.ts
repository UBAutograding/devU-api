import { check } from 'express-validator'

import validate from './generic.validator'

// TODO: check if user/course id exist
const userId = check('userId').isNumeric()
const courseId = check('courseId').isNumeric()
const level = check('level').isString().trim().isIn(['student', 'ta', 'instructor'])
const lectureSection = check('lectureSection').isString().trim().isLength({max: 128}).optional({nullable: true})
const dropped = check('dropped').isBoolean().optional()

const validator = [userId, courseId, level, lectureSection, dropped, validate]

export default validator