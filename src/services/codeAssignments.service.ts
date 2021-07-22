import { getRepository, IsNull } from 'typeorm'

import { CodeAssignment } from 'devu-shared-modules'

import CodeAssignmentsModel from '../model/codeAssignments.model'

const connect = () => getRepository(CodeAssignmentsModel)

export async function create(codeAssignment: CodeAssignment) {
  // TODO store file on S3
  return await connect().save(codeAssignment)
}

export async function update(codeAssignment: CodeAssignment) {
  const { id, assignmentId, grader, gradingImage } = codeAssignment

  if (!id) throw new Error('Missing Id')

  return await connect().update(id, { assignmentId, grader, gradingImage })
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

export default {
  create,
  retrieve,
  update,
  _delete,
  list,
}
