import { check } from 'express-validator'

import validate from './generic.validator'

const name = check('name').isString().trim().isLength({ max: 128 })
const gradingType = check('gradingType').isString().trim().isLength({ max: 128 })
const categoryName = check('categoryName').isString().trim().isLength({ max: 128 })
const description = check('description').isString().trim()
const startDate = check('startDate').isString().trim().isISO8601()
const dueDate = check('dueDate').isString().trim().isISO8601()
const endDate = check('endDate').isString().trim().isISO8601()

const validator = [name, gradingType, categoryName, description, startDate, dueDate, endDate, validate]

export default validator
