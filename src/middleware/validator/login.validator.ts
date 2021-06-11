import { check } from 'express-validator'

import validate from './generic.validator'

const email = check('email').isString().trim().isEmail()
const externalId = check('externalId').isString().trim()

export const validateDeveloper = [email, externalId, validate]
