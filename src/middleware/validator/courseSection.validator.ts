import { check } from 'express-validator'

import validate from './generic.validator'
import { isBeforeParam, isAfterParam } from './date.validator'

const sectionId = check('sectionId').isString().trim().isLength({ max: 128 })
const courseId = check('courseId').isNumeric()

const startDate = check('startDate')
    .trim()
    .isISO8601()
    .custom(isBeforeParam('dueDate'))
    .custom(isBeforeParam('endDate'))
    .toDate()

const endDate = check('endDate')
    .trim()
    .isISO8601()
    .custom(isAfterParam('startDate'))
    .custom(isAfterParam('dueDate'))
    .toDate()

const validator = [sectionId, courseId, startDate, endDate, validate ]

export default validator