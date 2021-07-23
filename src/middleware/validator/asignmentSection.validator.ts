import { check } from 'express-validator'

import validate from './generic.validator'

const assignmentSectionId = check('assignmentSectionId').isNumeric()
const assignmentId = check('assignmentId').isNumeric()
const sectionId = check('sectionId').isNumeric()
const startOffset = check('startOffset').isNumeric()
const endOffset = check('endOffset').isNumeric()

const validator = [assignmentSectionId, assignmentId, sectionId, startOffset, endOffset, validate]

export default validator