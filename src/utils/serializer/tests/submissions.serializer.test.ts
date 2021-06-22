import { serialize } from '../submissions.serializer'

import SubmissionModel from '../../../model/submissions.model'

import Testing from '../../testing.utils'

let mockSubmission: SubmissionModel

describe('Submission Serializer', () => {
    beforeEach(() => {
        mockSubmission = Testing.generateTypeOrm<SubmissionModel>(SubmissionModel)

        mockSubmission.id = 10
        mockSubmission.createdAt = new Date()
        mockSubmission.updatedAt = new Date()
        mockSubmission.submissionId = 123
        mockSubmission.courseId = 1
        mockSubmission.assignmentId = 2
        mockSubmission.userId = 456
        mockSubmission.submissionDatetime = new Date()
        mockSubmission.submissionType = 'filepath'
        mockSubmission.theActualSubmission = 'LARGE STRING'
        mockSubmission.submitterIp = '1A2B3C4D5yes'
        mockSubmission.originalSubmissionId = 98765
        mockSubmission.submitterId = 9999
    })

    describe('Serializing submissions',() => {
        test('submission values exist in the response', () =>{
            const expectedResult = serialize(mockSubmission)

            expect(expectedResult).toBeDefined()
            expect(expectedResult.id).toEqual(mockSubmission.id)
            expect(expectedResult.submissionId).toEqual(mockSubmission.submissionId)
            expect(expectedResult.courseId).toEqual(mockSubmission.courseId)
            expect(expectedResult.assignmentId).toEqual(mockSubmission.assignmentId)
            expect(expectedResult.userId).toEqual(mockSubmission.userId)
            expect(expectedResult.submissionType).toEqual(mockSubmission.submissionType)
            expect(expectedResult.theActualSubmission).toEqual(mockSubmission.theActualSubmission)
            expect(expectedResult.submitterIp).toEqual(mockSubmission.submitterIp)
            expect(expectedResult.originalSubmissionId).toEqual(mockSubmission.originalSubmissionId)
            expect(expectedResult.submitterId).toEqual(mockSubmission.submitterId)
        })



    test('CreatedAt and ModifiedAt are ISO strings for all submissions', () => {
        const expectedResult  = serialize(mockSubmission)

        expect(expectedResult).toBeDefined()
        expect(expectedResult .updatedAt).toEqual(mockSubmission.updatedAt.toISOString())
        expect(expectedResult .createdAt).toEqual(mockSubmission.updatedAt.toISOString())
    })
    })
})