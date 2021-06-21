import { check } from 'express-validator'

import validate from './generic.validator'

const userId = check('course_id').isNumeric()
const courseId = check('course_id').isNumeric()
const level = check('level').isString().trim().isIn(['student', 'ta', 'instructor'])
const lectureSection = check('lecture_section').isString().trim().isLength({max: 128}).optional({nullable: true})
const dropped = check('dropped').isBoolean().optional({nullable: true})

const validator = [userId, courseId, level, lectureSection, dropped, validate]

export default validator