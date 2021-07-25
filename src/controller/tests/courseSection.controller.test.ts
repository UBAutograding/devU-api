import { UpdateResult } from 'typeorm'

import {  CourseSection } from 'devu-shared-modules'

import controller from '../courseSections.controller'

import CourseSectionModel from '../../model/courseSections.model'

import CourseSectionService from '../../services/courseSection.service'

import { serialize } from '../../utils/serializer/courseSections.serializer'

import Testing from '../../utils/testing.utils'
import { GenericResponse, NotFound, Updated } from '../../utils/apiResponse.utils'

// Testing Globals
let req: any
let res: any
let next: any

let mockedCourseSections: CourseSectionModel[]
let mockedCourseSection: CourseSectionModel
let expectedResults: CourseSection[]
let expectedResult: CourseSection
let expectedError: Error

let expectedDbResult: UpdateResult

function populateCourseSection(courseSection: CourseSectionModel) {
  courseSection.startDate = new Date()
  courseSection.endDate = new Date()


  return courseSection
}

describe('CourseSectionController', () => {
  beforeEach(() => {
    req = Testing.fakeRequest()
    res = Testing.fakeResponse()
    next = Testing.fakeNext()

    mockedCourseSections = Testing.generateTypeOrmArray(CourseSectionModel, 3).map(populateCourseSection)
    mockedCourseSection = populateCourseSection(Testing.generateTypeOrm(CourseSectionModel))

    expectedResults = mockedCourseSections.map(serialize)
    expectedResult = serialize(mockedCourseSection)
    expectedError = new Error('Expected Error')

    expectedDbResult = {} as UpdateResult
  })

  describe('GET - /courseSections', () => {
    describe('200 - Ok', () => {
      beforeEach(async () => {
      CourseSectionService.list = jest.fn().mockImplementation(() => Promise.resolve(mockedCourseSections))
        await controller.get(req, res, next) // what we're testing
      })

      test('Returns list of courseSections', () => expect(res.json).toBeCalledWith(expectedResults))
      test('Status code is 200', () => expect(res.status).toBeCalledWith(200))
    })

    describe('400 - Bad request', () => {
      test('Next called with expected error', async () => {
        CourseSectionService.list = jest.fn().mockImplementation(() => Promise.reject(expectedError))

        try {
          await controller.get(req, res, next)

          fail('Expected test to throw')
        } catch {
          expect(next).toBeCalledWith(expectedError)
        }
      })
    })
  })

  describe('GET - /courseSections/:id', () => {
    describe('200 - Ok', () => {
      beforeEach(async () => {
        CourseSectionService.retrieve = jest.fn().mockImplementation(() => Promise.resolve(mockedCourseSection))
        await controller.detail(req, res, next)
      })

      test('Returns expected courseSections', () => expect(res.json).toBeCalledWith(expectedResult))
      test('Status code is 200', () => expect(res.status).toBeCalledWith(200))
    })

    describe('404 - Not Found', () => {
      beforeEach(async () => {
        CourseSectionService.retrieve = jest.fn().mockImplementation(() => Promise.resolve()) // No results
        await controller.detail(req, res, next)
      })

      test('Status code is 404 on missing courseSection', () => expect(res.status).toBeCalledWith(404))
      test('Responds with NotFound on missing courseSection', () => expect(res.json).toBeCalledWith(NotFound))
      test('Next not called on missing courseSection', () => expect(next).toBeCalledTimes(0))
    })

    describe('400 - Bad Request', () => {
      test('Next called with expected error', async () => {
        CourseSectionService.retrieve = jest.fn().mockImplementation(() => Promise.reject(expectedError))

        try {
          await controller.detail(req, res, next)

          fail('Expected test to throw')
        } catch {
          expect(next).toBeCalledWith(expectedError)
        }
      })
    })
  })

  describe('POST - /courseSection/', () => {
    describe('201 - Created', () => {
      beforeEach(async () => {
        CourseSectionService.create = jest.fn().mockImplementation(() => Promise.resolve(mockedCourseSection))
        await controller.post(req, res, next)
      })

      test('Returns expected courseSection', () => expect(res.json).toBeCalledWith(expectedResult))
      test('Status code is 201', () => expect(res.status).toBeCalledWith(201))
    })

    describe('400 - Bad Request', () => {
      beforeEach(async () => {
        CourseSectionService.create = jest.fn().mockImplementation(() => Promise.reject(expectedError))

        try {
          await controller.post(req, res, next)

          fail('Expected test to throw')
        } catch {
          // continue to tests
        }
      })

      test('Status code is 400', () => expect(res.status).toBeCalledWith(400))
      test('Responds with generic error', () =>
        expect(res.json).toBeCalledWith(new GenericResponse(expectedError.message)))
      test('Next not called', () => expect(next).toBeCalledTimes(0))
    })
  })

  describe('PUT - /assignments/:id', () => {
    describe('200 - Ok', () => {
      beforeEach(async () => {
        expectedDbResult.affected = 1 // mocking service return shape
        CourseSectionService.update = jest.fn().mockImplementation(() => Promise.resolve(expectedDbResult))
        await controller.put(req, res, next)
      })

      test('Status code is 200', () => expect(res.status).toBeCalledWith(200))
      test('Returns Updated message', () => expect(res.json).toBeCalledWith(Updated))
      test('Next is not called', () => expect(next).toHaveBeenCalledTimes(0))
    })

    describe('404 - Not Found', () => {
      beforeEach(async () => {
        expectedDbResult.affected = 0 // No records affected in db
        CourseSectionService.update = jest.fn().mockImplementation(() => Promise.resolve(expectedDbResult))
        await controller.put(req, res, next)
      })

      test('Status code is 404', () => expect(res.status).toBeCalledWith(404))
      test('Returns Not found message', () => expect(res.json).toBeCalledWith(NotFound))
      test('Next is not called', () => expect(next).toHaveBeenCalledTimes(0))
    })

    describe('400 - Bad Request', () => {
      beforeEach(async () => {
        CourseSectionService.update = jest.fn().mockImplementation(() => Promise.reject(expectedError))
        await controller.put(req, res, next)
      })

      test('Next is called with error', () => expect(next).toBeCalledWith(expectedError))
    })
  })

  describe('DELETE - /assignments/:id', () => {
    describe('204 - No Content', () => {
      beforeEach(async () => {
        expectedDbResult.affected = 1
        CourseSectionService._delete = jest.fn().mockImplementation(() => Promise.resolve(expectedDbResult))
        await controller._delete(req, res, next)
      })

      test('Status code is 204', () => expect(res.status).toBeCalledWith(204))
      test('Response to have no content', () => expect(res.send).toBeCalledWith())
      test('Next not called', () => expect(next).toBeCalledTimes(0))
    })

    describe('404 - Not Found', () => {
      beforeEach(async () => {
        expectedDbResult.affected = 0
        CourseSectionService._delete = jest.fn().mockImplementation(() => Promise.resolve(expectedDbResult))
        await controller._delete(req, res, next)
      })

      test('Status code is 404', () => expect(res.status).toBeCalledWith(404))
      test('Response to have no content', () => expect(res.json).toBeCalledWith(NotFound))
      test('Next not called', () => expect(next).toBeCalledTimes(0))
    })

    describe('400 - Bad Request', () => {
      beforeEach(async () => {
        CourseSectionService._delete = jest.fn().mockImplementation(() => Promise.reject(expectedError))
        await controller._delete(req, res, next)
      })

      test('Next called with expected error', () => expect(next).toBeCalledWith(expectedError))
    })
  })
})






