import { Submission } from 'devu-shared-modules'

import SubmissionModel from '../../model/submissions.model'

export function serialize(submission: SubmissionModel): Submission {
  return {
    id: submission.id,
    submissionId: submission.submissionId,
    courseId: submission.courseId,
    assignmentId: submission.assignmentId,
    userId: submission.userId,
    submissionDatetime: submission.submissionDatetime,
    submissionType: submission.submissionType,
    theActualSubmission: submission.theActualSubmission,
    submitterIp: submission.submitterIp,
    originalSubmissionId: submission.originalSubmissionId,
    submitterId: submission.submitterId,
    createdAt: submission.createdAt.toISOString(),
    updatedAt: submission.updatedAt.toISOString(),
  }
}
