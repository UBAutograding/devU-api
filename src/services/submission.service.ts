import { getRepository, IsNull } from 'typeorm'

import SubmissionModel from '../model/submissions.model'

import { Submission } from 'devu-shared-modules'

const connect = () => getRepository(SubmissionModel)

export async function create(submission: Submission) {
    return await connect().save(submission)
}

export async function update(submission: Submission) {
    const { id, submissionId, courseId, assignmentId, userId, submissionDatetime, submissionType, theActualSubmission, submitterIp, originalSubmissionId, submitterId} = submission

    if (!id) throw new Error('Missing Id')

    return await connect().update(id, { submissionId, courseId, assignmentId, userId, submissionDatetime, submissionType, theActualSubmission, submitterIp, originalSubmissionId, submitterId })
}

export async function _delete(id: number) {
    return await connect().softDelete({ id, deletedAt: IsNull() })
}

export async function retrieve(id: number) {
    return await connect().findOne({ id, deletedAt: IsNull() })
}

export async function list() {
    return await connect().find({ deletedAt: IsNull() })
}

export async function ensure(submissionInfo: Submission) {
    const { originalSubmissionId, assignmentId, submissionDatetime,submissionType  } = submissionInfo

    const submission = await connect().findOne({ assignmentId })

    if (submission) return { submission, isNewSubmission: false }

    const newUser = await create({ originalSubmissionId, assignmentId, submissionDatetime,submissionType })

    return { submission: newUser, isNewSubmission: true }
}

export default {
    create,
    retrieve,
    update,
    _delete,
    list,
    ensure,
}
