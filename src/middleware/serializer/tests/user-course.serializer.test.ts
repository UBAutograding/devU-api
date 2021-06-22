import serializer from '../user-course.serializer'

import UserCourse from '../../../model/user-course.model'

import Testing from '../../../utils/testing.utils'
import { Unknown } from '../../../utils/apiResponse.utils'

let req
let res
let next

let expectedResults: UserCourse[]
let expectedResult: UserCourse
let expectedStatusCode: number

describe('UserCourse Serializer', () => {
  beforeEach(() => {
    req = Testing.fakeRequest()
    res = Testing.fakeResponse()
    next = Testing.fakeNext()

    expectedResults = Testing.generateTypeOrmArray<UserCourse>(UserCourse, 3)
    expectedResult = Testing.generateTypeOrm<UserCourse>(UserCourse)

    expectedResult.id = 10
    expectedResult.userId = 50
    expectedResult.courseId = 100
    expectedResult.lectureSection = 'A'
    expectedResult.level = 'ta'
    expectedResult.dropped = false
    expectedResult.createdAt = new Date()
    expectedResult.updatedAt = new Date()

    expectedStatusCode = 200
  })

  describe('Missing userCourse and userCourses', () => {
    beforeEach(() => serializer(req, res, next))

    test('400 without userCourse or userCourses', () => expect(res.status).toBeCalledWith(400))
    test('Unknown request message without userCourse of userCourses', () => expect(res.json).toBeCalledWith(Unknown))
    test('Next is not called', () => expect(next).toBeCalledTimes(0))
  })

  describe('Serializing UserCourse', () => {
    beforeEach(() => {
      req.userCourse = expectedResult
      req.statusCode = expectedStatusCode
      serializer(req, res, next)
    })

    test('Status code from req', () => expect(res.status).toBeCalledWith(expectedStatusCode))
    test('CourseUser values exist in the response', () => {
      expect(res.json).toBeCalledTimes(1)

      const response = res.json.mock.calls[0][0]

      expect(response).toBeDefined()
      expect(response.id).toEqual(expectedResult.id)
      expect(response.userId).toEqual(expectedResult.userId)
      expect(response.courseId).toEqual(expectedResult.courseId)
      expect(response.lectureSection).toEqual(expectedResult.lectureSection)
      expect(response.level).toEqual(expectedResult.level)
      expect(response.dropped).toEqual(expectedResult.dropped)
    })

    test('CreatedAt and ModifiedAt are ISO strings', () => {
      expect(res.json).toBeCalledTimes(1)

      const response = res.json.mock.calls[0][0]

      expect(response).toBeDefined()
      expect(response.updatedAt).toEqual(expectedResult.updatedAt.toISOString())
      expect(response.createdAt).toEqual(expectedResult.createdAt.toISOString())
    })
  })

  describe('Serializing a list of UserCourses', () => {
    beforeEach(() => {
      req.userCourses = expectedResults
      req.statusCode = expectedStatusCode
      serializer(req, res, next)
    })

    test('Status code from req', () => expect(res.status).toBeCalledWith(expectedStatusCode))
    test('CreatedAt and ModifiedAt are ISO strings for all userCourses', () => {
      expect(res.json).toBeCalledTimes(1)

      const response = res.json.mock.calls[0][0]

      expect(Array.isArray(response)).toBe(true)

      for(const i in response) {
        const expectedUser = expectedResults[i]
        const serializedUser = response[i]

        expect(serializedUser.updatedAt).toEqual(expectedUser.updatedAt.toISOString())
        expect(serializedUser.createdAt).toEqual(expectedUser.createdAt.toISOString())
      }
    })

  })
})