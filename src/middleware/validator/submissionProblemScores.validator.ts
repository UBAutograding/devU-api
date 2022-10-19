import {check} from 'express-validator'

import validate from './generic.validator'


//submissionId: foreign_key
//  numeric: nullable?
const submissionId = check('submissionId').isNumeric()

//assignmentProblemId: foreign_key
//  numeric: nullable?
const assignmentProblemId = check('assignmentProblemId').isNumeric()

//score: number
//  numeric: not nullable
const score = check('score').isNumeric()

//feedback: string
//  is string: nullable
const feedback = check('feedback').isString().trim().optional({nullable: true})

//released: date
//  date.validator.ts?
const releaseDate = check('releaseDate').isString().trim().isISO8601().toDate()

const validator = [submissionId, assignmentProblemId, score, feedback, releaseDate, validate]

export default validator