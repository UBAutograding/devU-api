import { check } from 'express-validator'

import validate from './generic.validator'
import { isBeforeParam, isAfterParam } from './date.validator'

const assignmentSectionId = check('assignmentSectionId').isNumeric()
const assignmentId = check('assignmentId').isNumeric()
const sectionId = check('sectionId').isNumeric()

const startOffset = check('startOffset')
  .trim()
  .isISO8601()
  .custom(isBeforeParam('endOffset'))

const endOffset = check('endOffset')
  .trim()
  .isISO8601()
  .custom(isAfterParam('startOffset'))


const validator = [
  assignmentSectionId,
  assignmentId,
  sectionId,
  startOffset,
  endOffset,
  validate
]

export default validator