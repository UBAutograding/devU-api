import { getRepository, IsNull } from 'typeorm'

import { SubmissionProblemScore as SubmissionProblemScoreModel } from 'devu-shared-modules'

import SubmissionProblemScore from '../model/submissionProblemScore.model'

const connect = () => getRepository(SubmissionProblemScore)

export async function create(submissionProblemScore: SubmissionProblemScoreModel) {
  return await connect().save(submissionProblemScore)
}

export async function update(submissionProblemScore: SubmissionProblemScoreModel) {
  const { submissionId, assignmentProblemId, score, feedback, released } = submissionProblemScore

  if (!submissionId) throw new Error('Missing Id')

  return await connect().update(submissionId, { assignmentProblemId, score, feedback, released })
}

export async function _delete(submissionId: number) {
  return await connect().softDelete({ submissionId, deletedAt: IsNull() })
}

export async function retrieve(submissionId: number) {
  return await connect().findOne({ submissionId, deletedAt: IsNull() })
}

export async function list(submissionId: number) {
  return await connect().find({ deletedAt: IsNull(), submissionId })
}

export default {
  create,
  retrieve,
  update,
  _delete,
  list,
}
