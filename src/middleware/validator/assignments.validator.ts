import { check } from 'express-validator'

import validate from './generic.validator'

const courseId = check('courseId').isNumeric()
const name = check('name').isString().trim().isLength({ max: 128 })
const gradingType = check('gradingType').isString().trim().isLength({ max: 128 })
const categoryName = check('categoryName').isString().trim().isLength({ max: 128 })
const description = check('description').isString().trim()
const startDate = check('startDate').isString().trim().isISO8601()
const dueDate = check('dueDate').isString().trim().isISO8601()
const endDate = check('endDate').isString().trim().isISO8601()
const maxFileSize = check('maxFileSize').isNumeric()
const maxSubmissions = check('maxSubmissions').isNumeric()
const disableHandins = check('disableHandins').isBoolean()

const validator = [courseId, name, gradingType, categoryName, description, startDate, dueDate, endDate,  maxFileSize, maxSubmissions, disableHandins, validate]

export default validator
