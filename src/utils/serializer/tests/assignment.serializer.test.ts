import { serialize } from '../assignments.serializer'

import AssignmentModel from '../../../model/assignments.model'

import Testing from '../../testing.utils'

let mockCourse: AssignmentModel

describe('Assignment Serializer', () => {
  beforeEach(() => {
    mockCourse = Testing.generateTypeOrm<AssignmentModel>(AssignmentModel)

    mockCourse.id = 10
    mockCourse.courseId = 123
    mockCourse.name = "qwerty"
    mockCourse.startDate = new Date()
    mockCourse.dueDate = new Date()
    mockCourse.endDate = new Date()
    mockCourse.gradingType = "gradingType"
    mockCourse.categoryName = "categoryName"
    mockCourse.description = "description"
    mockCourse.maxFileSize = 1
    mockCourse.maxSubmissions = 2
    mockCourse.disableHandins = true
    mockCourse.createdAt = new Date()
    mockCourse.updatedAt = new Date()
    mockCourse.deletedAt = new Date()
  })

  describe('Serializing courses',() => {
    test('course values exist in the response', () =>{
      const expectedResult = serialize(mockCourse)

      expect(expectedResult).toBeDefined()
      expect(expectedResult.id).toEqual(mockCourse.id)
      expect(expectedResult.courseId).toEqual(mockCourse.courseId)
      expect(expectedResult.name).toEqual(mockCourse.name)
      expect(expectedResult.startDate).toEqual(mockCourse.startDate)
      expect(expectedResult.dueDate).toEqual(mockCourse.dueDate)
      expect(expectedResult.endDate).toEqual(mockCourse.endDate)
      expect(expectedResult.gradingType).toEqual(mockCourse.gradingType)
      expect(expectedResult.categoryName).toEqual(mockCourse.categoryName)
      expect(expectedResult.description).toEqual(mockCourse.description)
      expect(expectedResult.maxFileSize).toEqual(mockCourse.maxFileSize)
      expect(expectedResult.maxSubmissions).toEqual(mockCourse.maxSubmissions)
      expect(expectedResult.disableHandins).toEqual(mockCourse.disableHandins)
     })

    test('CreatedAt and ModifiedAt are ISO strings for all submissions', () => {
      const expectedResult  = serialize(mockCourse)

      expect(expectedResult).toBeDefined()
      expect(expectedResult .updatedAt).toEqual(mockCourse.updatedAt.toISOString())
      expect(expectedResult .createdAt).toEqual(mockCourse.updatedAt.toISOString())
    })
  })
})
