import { SubmissionProblemScores } from 'devu-shared-modules'

import SubmissionProblemScoresModel from '../../model/submissionProblemScores.model'

export function serialize(submissionProblemScores: SubmissionProblemScoresModel): SubmissionProblemScores {
    return{
        id: submissionProblemScores.id,
        submissionId: submissionProblemScores.submissionId,
        assignmentProblemId: submissionProblemScores.assignmentProblemId,
        score: submissionProblemScores.score,
        feedback: submissionProblemScores.feedback,
        release: submissionProblemScores.release,
        createdAt: submissionProblemScores.createdAt.toDateString(),
        updatedAt: submissionProblemScores.updatedAt.toDateString(),
    }
}