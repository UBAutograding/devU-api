import { serialize } from '../assignmentSections.serializer'

import AssignmentSectionModel from '../../../model/assignmentSections.model'

import Testing from '../../testing.utils'

let mockAssignmentSection: AssignmentSectionModel

describe('AssignmentSection serializer', () => {
  beforeEach( () => {
    mockAssignmentSection = Testing.generateTypeOrm<AssignmentSectionModel>(AssignmentSectionModel)

    mockAssignmentSection.id = 11
    mockAssignmentSection.createdAt = new Date()
    mockAssignmentSection.updatedAt = new Date()
    mockAssignmentSection.assignmentSectionId = 12
    mockAssignmentSection.sectionId = 'A1'
    mockAssignmentSection.startOffset = 10
    mockAssignmentSection.endOffset = 0
    })
  describe('Serializing assignmentSection', () => {
    test('courseSection values exist in the response', () => {
      const expectedResult = serialize(mockAssignmentSection)

      expect(expectedResult.id).toEqual(mockAssignmentSection.id)
      expect(expectedResult.assignmentSectionId).toEqual(mockAssignmentSection.assignmentSectionId)
      expect(expectedResult.startOffset).toEqual(mockAssignmentSection.startOffset)
      expect(expectedResult.endOffset).toEqual(mockAssignmentSection.endOffset)

    })
    test('Dates are returned as ISO strings for all assignmentSections', () => {
      const expectedResult = serialize(mockAssignmentSection)

      expect(expectedResult).toBeDefined()
      expect(expectedResult.updatedAt).toEqual(mockAssignmentSection.updatedAt.toISOString())
      expect(expectedResult.createdAt).toEqual(mockAssignmentSection.createdAt.toISOString())
    })
  })
})