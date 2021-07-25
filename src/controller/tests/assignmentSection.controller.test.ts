import { UpdateResult } from 'typeorm'

import { AssignmentSection } from 'devu-shared-modules'

import controller from '../assignmentSections.controller'

import AssignmentSectionModel from '../../model/assignmentSections.model'

import AssignmentSectionService from '../../services/assignmentSection.service'

import { serialize } from '../../utils/serializer/assignmentSections.serializer'

import Testing from '../../utils/testing.utils'
import { GenericResponse, NotFound, Updated } from '../../utils/apiResponse.utils'

// Testing Globals
let req: any
let res: any
let next: any

let mockedAssignmentSections: AssignmentSectionModel[]
let mockedAssignmentSection: AssignmentSectionModel
let expectedResults: AssignmentSection[]
let expectedResult: AssignmentSection
let expectedError: Error

let expectedDbResult: UpdateResult

describe('AssignmentSectionController', () => {
  beforeEach(() => {
    req = Testing.fakeRequest()
    res = Testing.fakeResponse()
    next = Testing.fakeNext()

    mockedAssignmentSections = Testing.generateTypeOrmArray(AssignmentSectionModel, 3)
    mockedAssignmentSection = Testing.generateTypeOrm(AssignmentSectionModel)

    expectedResults = mockedAssignmentSections.map(serialize)
    expectedResult = serialize(mockedAssignmentSection)
    expectedError = new Error('Expected Error')

    expectedDbResult = {} as UpdateResult
  })

  describe('GET - /assignmentSection', () => {
    describe('200 - Ok', () => {
      beforeEach(async () => {
        AssignmentSectionService.list = jest.fn().mockImplementation(() => Promise.resolve(mockedAssignmentSections))
        await controller.get(req, res, next) // what we're testing
      })
      test('Returns list of assignmentSections', () => expect(res.json).toBeCalledWith(expectedResults))
      test('Status code is 200', () => expect(res.status).toBeCalledWith(200))
    })

  describe('400 - Bad request', () => {
    test('Next called with expected error', async () => {
    AssignmentSectionService.list = jest.fn().mockImplementation(() => Promise.reject(expectedError))

      try {
        await controller.get(req, res, next)

        fail('Expected test to throw')
      } catch {
        expect(next).toBeCalledWith(expectedError)
      }
    })
  })
})

describe('GET - /assignmentSections/:id', () => {
  describe('200 - Ok', () => {
    beforeEach(async () => {
    AssignmentSectionService.retrieve = jest.fn().mockImplementation(() => Promise.resolve(mockedAssignmentSection))
      await controller.detail(req, res, next)
    })

    test('Returns expected assignmentSection', () => expect(res.json).toBeCalledWith(expectedResult))
    test('Status code is 200', () => expect(res.status).toBeCalledWith(200))
  })

  describe('404 - Not Found', () => {
    beforeEach(async () => {
      AssignmentSectionService.retrieve = jest.fn().mockImplementation(() => Promise.resolve()) // No results
      await controller.detail(req, res, next)
    })

    test('Status code is 404 on missing assignmentSection', () => expect(res.status).toBeCalledWith(404))
    test('Responds with NotFound on missing assignmentSection', () => expect(res.json).toBeCalledWith(NotFound))
    test('Next not called on missing assignmentSection', () => expect(next).toBeCalledTimes(0))
  })

  describe('400 - Bad Request', () => {
    test('Next called with expected error', async () => {
      AssignmentSectionService.retrieve = jest.fn().mockImplementation(() => Promise.reject(expectedError))

      try {
        await controller.detail(req, res, next)

        fail('Expected test to throw')
      } catch {
        expect(next).toBeCalledWith(expectedError)
      }
    })
  })
})

describe('POST - /users/', () => {
  describe('201 - Created', () => {
    beforeEach(async () => {
      AssignmentSectionService.create = jest.fn().mockImplementation(() => Promise.resolve(mockedAssignmentSection))
      await controller.post(req, res, next)
    })

    test('Returns expected assignmentSection', () => expect(res.json).toBeCalledWith(expectedResult))
    test('Status code is 201', () => expect(res.status).toBeCalledWith(201))
  })

  describe('400 - Bad Request', () => {
    beforeEach(async () => {
    AssignmentSectionService.create = jest.fn().mockImplementation(() => Promise.reject(expectedError))

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

describe('PUT - /assignmentSections/:id', () => {
  describe('200 - Ok', () => {
    beforeEach(async () => {
      expectedDbResult.affected = 1 // mocking service return shape
      AssignmentSectionService.update = jest.fn().mockImplementation(() => Promise.resolve(expectedDbResult))
      await controller.put(req, res, next)
    })

    test('Status code is 200', () => expect(res.status).toBeCalledWith(200))
    test('Returns Updated message', () => expect(res.json).toBeCalledWith(Updated))
    test('Next is not called', () => expect(next).toHaveBeenCalledTimes(0))
  })

  describe('404 - Not Found', () => {
    beforeEach(async () => {
      expectedDbResult.affected = 0 // No records affected in db
      AssignmentSectionService.update = jest.fn().mockImplementation(() => Promise.resolve(expectedDbResult))
      await controller.put(req, res, next)
    })

    test('Status code is 404', () => expect(res.status).toBeCalledWith(404))
    test('Returns Not found message', () => expect(res.json).toBeCalledWith(NotFound))
    test('Next is not called', () => expect(next).toHaveBeenCalledTimes(0))
  })

  describe('400 - Bad Request', () => {
    beforeEach(async () => {
    AssignmentSectionService.update = jest.fn().mockImplementation(() => Promise.reject(expectedError))
      await controller.put(req, res, next)
    })

    test('Next is called with error', () => expect(next).toBeCalledWith(expectedError))
  })
})

describe('DELETE - /users/:id', () => {
  describe('204 - No Content', () => {
    beforeEach(async () => {
      expectedDbResult.affected = 1
      AssignmentSectionService._delete = jest.fn().mockImplementation(() => Promise.resolve(expectedDbResult))
      await controller._delete(req, res, next)
    })

    test('Status code is 204', () => expect(res.status).toBeCalledWith(204))
    test('Response to have no content', () => expect(res.send).toBeCalledWith())
    test('Next not called', () => expect(next).toBeCalledTimes(0))
  })

  describe('404 - Not Found', () => {
    beforeEach(async () => {
      expectedDbResult.affected = 0
      AssignmentSectionService._delete = jest.fn().mockImplementation(() => Promise.resolve(expectedDbResult))
      await controller._delete(req, res, next)
    })

    test('Status code is 404', () => expect(res.status).toBeCalledWith(404))
    test('Response to have no content', () => expect(res.json).toBeCalledWith(NotFound))
    test('Next not called', () => expect(next).toBeCalledTimes(0))
  })

  describe('400 - Bad Request', () => {
    beforeEach(async () => {
    AssignmentSectionService._delete = jest.fn().mockImplementation(() => Promise.reject(expectedError))
      await controller._delete(req, res, next)
    })

    test('Next called with expected error', () => expect(next).toBeCalledWith(expectedError))
    })
  })
})










