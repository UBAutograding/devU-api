import { check } from 'express-validator'

import validate from './generic.validator'

const name = check('name').isString().trim().isLength({ max: 128 })
const semester = check('semester').isString().trim().isLength({ max: 128 })
const number = check('number').isString().trim().isLength({ max: 128 })
// Should we validate dates?

const validator = [name, semester, number, validate]

export default validator
