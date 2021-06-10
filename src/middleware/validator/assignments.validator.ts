import { check } from 'express-validator'

import validate from './generic.validator'

const name = check('name').isString().trim().isLength({ max: 128 })
const grading_type = check('grading_type').isString().trim().isLength({ max: 128 })
const category_name = check('category_name').isString().trim().isLength({ max: 128 })
const description = check('description').isString().trim().isLength({ max: 128 })

const validator = [name, grading_type, category_name, description, validate]

export default validator
