import { check } from 'express-validator'

import validate from './generic.validator'

const name = check('name').isString().trim().isLength({ max: 128 })
const semester = check('semester').isString().trim().isLength({ max: 128 })
const number = check('number').isString().trim().isLength({ max: 128 })
const startDate = check('startDate').isString().trim().isISO8601()
const endDate = check('endDate').isString().trim().isISO8601()

const validator = [name, semester, number, startDate, endDate, validate]

export default validator
