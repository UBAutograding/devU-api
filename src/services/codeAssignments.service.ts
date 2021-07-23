import { getRepository, IsNull } from 'typeorm'
import { Readable } from 'stream'

import { CodeAssignment } from 'devu-shared-modules'

import CodeAssignmentsModel from '../model/codeAssignments.model'
import { minioClient } from '../fileStorage'

const connect = () => getRepository(CodeAssignmentsModel)

function assignmentGraderFileRecordName(codeAssignment: CodeAssignment) {
  if (!codeAssignment.id) throw new Error('Missing Id')
  return codeAssignment.id.toString()
}

export async function create(codeAssignment: CodeAssignment, graderFile: Readable) {
  const newAssignment = await connect().save(codeAssignment)
  const graderFileRecordName: string = assignmentGraderFileRecordName(newAssignment)

  await minioClient.putObject('graders', graderFileRecordName, graderFile)
  newAssignment.grader = graderFileRecordName

  const { id, assignmentId, grader, gradingImage } = newAssignment
  await connect().update(id, { assignmentId, grader, gradingImage })

  return newAssignment
}

export async function update(codeAssignment: CodeAssignment, graderFile: Readable) {
  if (!codeAssignment.id) throw new Error('Missing Id')

  const graderFileRecordName: string = assignmentGraderFileRecordName(codeAssignment)

  await minioClient.putObject('graders', graderFileRecordName, graderFile)
  codeAssignment.grader = graderFileRecordName

  const { id, assignmentId, grader, gradingImage } = codeAssignment
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
