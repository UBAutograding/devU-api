// import { UpdateResult } from 'typeorm'
//
// import { UserCourse } from 'devu-shared-modules'
//
// import controller from '../user-course.controller'
//
// import UserCourseModel from '../../model/user-course.model'
//
// import UserCourseService from '../../services/user-course.service'
//
// import { serialize } from '../../utils/serializer/user-course.serializer'
//
// import Testing from '../../utils/testing.utils'
// import { GenericResponse, NotFound, Updated } from '../../utils/apiResponse.utils'
//
// // Testing Globals
// let req: any
// let res: any
// let next: any
//
// let mockedUserCourses: UserCourseModel[]
// let mockedUserCourse: UserCourseModel
// let expectedResults: UserCourse[]
// let expectedResult: UserCourse
// let expectedError: Error
//
// let expectedDbResult: UpdateResult
//
// describe('UserCourseController', () => {
//   beforeEach(() => {
//     req = Testing.fakeRequest()
//     res = Testing.fakeResponse()
//     next = Testing.fakeNext()
//
//     mockedUserCourses = Testing.generateTypeOrmArray(UserCourseModel, 3)
//     mockedUserCourse = Testing.generateTypeOrm(UserCourseModel)
//
//     expectedResults = mockedUserCourses.map(serialize)
//     expectedResult = serialize(mockedUserCourse)
//     expectedError = new Error('Expected Error')
//
//     expectedDbResult = {} as UpdateResult
//   })
//
//   describe('GET - /user-course', () => {
//     describe('200 - Ok', () => {
//       beforeEach(async () => {
//         UserCourseService.list = jest.fn().mockImplementation(() => Promise.resolve(mockedUserCourses))
//         await controller.get(req, res, next) // what we're testing
//       })
//
//       test('Returns list of userCourses', () => expect(res.json).toBeCalledWith(expectedResults))
//       test('Status code is 200', () => expect(res.status).toBeCalledWith(200))
//     })
//
//     describe('400 - Bad request', () => {
//       test('Next called with expected error', async () => {
//         UserCourseService.list = jest.fn().mockImplementation(() => Promise.reject(expectedError))
//
//         try {
//           await controller.get(req, res, next)
//
//           fail('Expected test to throw')
//         } catch {
//           expect(next).toBeCalledWith(expectedError)
//         }
//       })
//     })
//   })
//
//   describe('GET - /users/:id', () => {
//     describe('200 - Ok', () => {
//       beforeEach(async () => {
//         UserService.retrieve = jest.fn().mockImplementation(() => Promise.resolve(mockedUser))
//         await controller.detail(req, res, next)
//       })
//
//       test('Returns expected user', () => expect(res.json).toBeCalledWith(expectedResult))
//       test('Status code is 200', () => expect(res.status).toBeCalledWith(200))
//     })
//
//     describe('404 - Not Found', () => {
//       beforeEach(async () => {
//         UserService.retrieve = jest.fn().mockImplementation(() => Promise.resolve()) // No results
//         await controller.detail(req, res, next)
//       })
//
//       test('Status code is 404 on missing user', () => expect(res.status).toBeCalledWith(404))
//       test('Responds with NotFound on missing user', () => expect(res.json).toBeCalledWith(NotFound))
//       test('Next not called on missing user', () => expect(next).toBeCalledTimes(0))
//     })
//
//     describe('400 - Bad Request', () => {
//       test('Next called with expected error', async () => {
//         UserService.retrieve = jest.fn().mockImplementation(() => Promise.reject(expectedError))
//
//         try {
//           await controller.detail(req, res, next)
//
//           fail('Expected test to throw')
//         } catch {
//           expect(next).toBeCalledWith(expectedError)
//         }
//       })
//     })
//   })
//
//   describe('POST - /users/', () => {
//     describe('201 - Created', () => {
//       beforeEach(async () => {
//         UserService.create = jest.fn().mockImplementation(() => Promise.resolve(mockedUser))
//         await controller.post(req, res, next)
//       })
//
//       test('Returns expected user', () => expect(res.json).toBeCalledWith(expectedResult))
//       test('Status code is 201', () => expect(res.status).toBeCalledWith(201))
//     })
//
//     describe('400 - Bad Request', () => {
//       beforeEach(async () => {
//         UserService.create = jest.fn().mockImplementation(() => Promise.reject(expectedError))
//
//         try {
//           await controller.post(req, res, next)
//
//           fail('Expected test to throw')
//         } catch {
//           // continue to tests
//         }
//       })
//
//       test('Status code is 400', () => expect(res.status).toBeCalledWith(400))
//       test('Responds with generic error', () =>
//         expect(res.json).toBeCalledWith(new GenericResponse(expectedError.message)))
//       test('Next not called', () => expect(next).toBeCalledTimes(0))
//     })
//   })
//
//   describe('PUT - /users/:id', () => {
//     describe('200 - Ok', () => {
//       beforeEach(async () => {
//         expectedDbResult.affected = 1 // mocking service return shape
//         UserService.update = jest.fn().mockImplementation(() => Promise.resolve(expectedDbResult))
//         await controller.put(req, res, next)
//       })
//
//       test('Status code is 200', () => expect(res.status).toBeCalledWith(200))
//       test('Returns Updated message', () => expect(res.json).toBeCalledWith(Updated))
//       test('Next is not called', () => expect(next).toHaveBeenCalledTimes(0))
//     })
//
//     describe('404 - Not Found', () => {
//       beforeEach(async () => {
//         expectedDbResult.affected = 0 // No records affected in db
//         UserService.update = jest.fn().mockImplementation(() => Promise.resolve(expectedDbResult))
//         await controller.put(req, res, next)
//       })
//
//       test('Status code is 404', () => expect(res.status).toBeCalledWith(404))
//       test('Returns Not found message', () => expect(res.json).toBeCalledWith(NotFound))
//       test('Next is not called', () => expect(next).toHaveBeenCalledTimes(0))
//     })
//
//     describe('400 - Bad Request', () => {
//       beforeEach(async () => {
//         UserService.update = jest.fn().mockImplementation(() => Promise.reject(expectedError))
//         await controller.put(req, res, next)
//       })
//
//       test('Next is called with error', () => expect(next).toBeCalledWith(expectedError))
//     })
//   })
//
//   describe('DELETE - /users/:id', () => {
//     describe('204 - No Content', () => {
//       beforeEach(async () => {
//         expectedDbResult.affected = 1
//         UserService._delete = jest.fn().mockImplementation(() => Promise.resolve(expectedDbResult))
//         await controller._delete(req, res, next)
//       })
//
//       test('Status code is 204', () => expect(res.status).toBeCalledWith(204))
//       test('Response to have no content', () => expect(res.send).toBeCalledWith())
//       test('Next not called', () => expect(next).toBeCalledTimes(0))
//     })
//
//     describe('404 - Not Found', () => {
//       beforeEach(async () => {
//         expectedDbResult.affected = 0
//         UserService._delete = jest.fn().mockImplementation(() => Promise.resolve(expectedDbResult))
//         await controller._delete(req, res, next)
//       })
//
//       test('Status code is 404', () => expect(res.status).toBeCalledWith(404))
//       test('Response to have no content', () => expect(res.json).toBeCalledWith(NotFound))
//       test('Next not called', () => expect(next).toBeCalledTimes(0))
//     })
//
//     describe('400 - Not Found', () => {
//       beforeEach(async () => {
//         UserService._delete = jest.fn().mockImplementation(() => Promise.reject(expectedError))
//         await controller._delete(req, res, next)
//       })
//
//       test('Next called with expected error', () => expect(next).toBeCalledWith(expectedError))
//     })
//   })
// })
//
//
// // import { serialize } from '../user-course.serializer'
// //
// // import UserCourse from '../../../model/user-course.model'
// //
// // import Testing from '../../../utils/testing.utils'
// // import { Unknown } from '../../../utils/apiResponse.utils'
// //
// // let req
// // let res
// // let next
// //
// // let expectedResults: UserCourse[]
// // let expectedResult: UserCourse
// // let expectedStatusCode: number
// //
// // describe('UserCourse Serializer', () => {
// //   beforeEach(() => {
// //     req = Testing.fakeRequest()
// //     res = Testing.fakeResponse()
// //     next = Testing.fakeNext()
// //
// //     expectedResults = Testing.generateTypeOrmArray<UserCourse>(UserCourse, 3)
// //     expectedResult = Testing.generateTypeOrm<UserCourse>(UserCourse)
// //
// //     expectedResult.id = 10
// //     expectedResult.userId = 50
// //     expectedResult.courseId = 100
// //     expectedResult.lectureSection = 'A'
// //     expectedResult.level = 'ta'
// //     expectedResult.dropped = false
// //     expectedResult.createdAt = new Date()
// //     expectedResult.updatedAt = new Date()
// //
// //     expectedStatusCode = 200
// //   })
// //
// //   describe('Missing userCourse and userCourses', () => {
// //     beforeEach(() => serialize(req, res, next))
// //
// //     test('400 without userCourse or userCourses', () => expect(res.status).toBeCalledWith(400))
// //     test('Unknown request message without userCourse of userCourses', () => expect(res.json).toBeCalledWith(Unknown))
// //     test('Next is not called', () => expect(next).toBeCalledTimes(0))
// //   })
// //
// //   describe('Serializing UserCourse', () => {
// //     beforeEach(() => {
// //       req.userCourse = expectedResult
// //       req.statusCode = expectedStatusCode
// //       serializer(req, res, next)
// //     })
// //
// //     test('Status code from req', () => expect(res.status).toBeCalledWith(expectedStatusCode))
// //     test('CourseUser values exist in the response', () => {
// //       expect(res.json).toBeCalledTimes(1)
// //
// //       const response = res.json.mock.calls[0][0]
// //
// //       expect(response).toBeDefined()
// //       expect(response.id).toEqual(expectedResult.id)
// //       expect(response.userId).toEqual(expectedResult.userId)
// //       expect(response.courseId).toEqual(expectedResult.courseId)
// //       expect(response.lectureSection).toEqual(expectedResult.lectureSection)
// //       expect(response.level).toEqual(expectedResult.level)
// //       expect(response.dropped).toEqual(expectedResult.dropped)
// //     })
// //
// //     test('CreatedAt and ModifiedAt are ISO strings', () => {
// //       expect(res.json).toBeCalledTimes(1)
// //
// //       const response = res.json.mock.calls[0][0]
// //
// //       expect(response).toBeDefined()
// //       expect(response.updatedAt).toEqual(expectedResult.updatedAt.toISOString())
// //       expect(response.createdAt).toEqual(expectedResult.createdAt.toISOString())
// //     })
// //   })
// //
// //   describe('Serializing a list of UserCourses', () => {
// //     beforeEach(() => {
// //       req.userCourses = expectedResults
// //       req.statusCode = expectedStatusCode
// //       serializer(req, res, next)
// //     })
// //
// //     test('Status code from req', () => expect(res.status).toBeCalledWith(expectedStatusCode))
// //     test('CreatedAt and ModifiedAt are ISO strings for all userCourses', () => {
// //       expect(res.json).toBeCalledTimes(1)
// //
// //       const response = res.json.mock.calls[0][0]
// //
// //       expect(Array.isArray(response)).toBe(true)
// //
// //       for(const i in response) {
// //         const expectedUser = expectedResults[i]
// //         const serializedUser = response[i]
// //
// //         expect(serializedUser.updatedAt).toEqual(expectedUser.updatedAt.toISOString())
// //         expect(serializedUser.createdAt).toEqual(expectedUser.createdAt.toISOString())
// //       }
// //     })
// //
// //   })
// // })