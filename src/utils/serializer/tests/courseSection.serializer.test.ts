import { serialize } from '../courseSection.serializer'

import CourseSectionModel from '../../../model/courseSections.model'

import Testing from '../../testing.utils'

let mockCourseSection: CourseSectionModel

describe('CourseSection serializer', () => {
  beforeEach( () => {
  mockCourseSection = Testing.generateTypeOrm<CourseSectionModel>(CourseSectionModel)

  mockCourseSection.id = 10
  mockCourseSection.createdAt = new Date()
  mockCourseSection.updatedAt = new Date()
  mockCourseSection.sectionId = 'A3'
  mockCourseSection.courseId = 100
  mockCourseSection.startDate = new Date()
  mockCourseSection.endDate = new Date()
})
describe('Serializing courseSections', () => {
  test('courseSection values exist in the response', () => {
    const expectedResult = serialize(mockCourseSection)

    expect(expectedResult.id).toEqual(mockCourseSection.id)
    expect(expectedResult.sectionId).toEqual(mockCourseSection.sectionId)
    expect(expectedResult.courseId).toEqual(mockCourseSection.courseId)


  })
  test('Dates are returned as ISO strings for all courseSections', () => {
  const expectedResult = serialize(mockCourseSection)

    expect(expectedResult).toBeDefined()
    expect(expectedResult.updatedAt).toEqual(mockCourseSection.updatedAt.toISOString())
    expect(expectedResult.createdAt).toEqual(mockCourseSection.createdAt.toISOString())
    expect(expectedResult.startDate).toEqual(mockCourseSection.startDate.toISOString())
    expect(expectedResult.endDate).toEqual(mockCourseSection.endDate.toISOString())
  })
})
})
