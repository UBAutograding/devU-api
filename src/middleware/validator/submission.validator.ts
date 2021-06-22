import { check } from 'express-validator'

import validate from './generic.validator'

const submissionId = check('submissionId').isNumeric()
const courseId = check('courseId').isNumeric()
const assignmentId = check('assignmentId').isNumeric()
const userId = check('userId').isNumeric()
const submissionDatetime = check('submissionDatetime').isString().trim().isISO8601()
const submissionType = check('submissionType').isString().trim().isLength({max: 128})
const theActualSubmission = check('theActualSubmission').isString().trim()
const submitterIp = check('theActualSubmission').isString().trim().isLength({max: 128})
const originalSubmissionId = check('originalSubmissionId').isNumeric()
const submitterId = check('submitterId').isNumeric()

const validator = [submissionId, courseId, assignmentId, userId, submissionDatetime, submissionType, theActualSubmission, submitterIp, originalSubmissionId, submitterId, validate]

export default validator