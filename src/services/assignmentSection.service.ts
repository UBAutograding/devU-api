import { getRepository, IsNull } from 'typeorm'

import AssignmentSectionModel from '../model/assignmentSections.model'

import { AssignmentSection } from 'devu-shared-modules'

const connect = () => getRepository(AssignmentSectionModel)

export async function create(assignmentSection: AssignmentSection) {
  return await connect().save(assignmentSection)
}

export async function update(assignmentSection: AssignmentSection) {
  const {
    id,
    assignmentSectionId,
    assignmentId,
    sectionId,
    startOffset,
    endOffset
  } = assignmentSection

  if (!id) throw new Error('Missing Id')

  return await connect().update(id, {
    assignmentSectionId,
    assignmentId,
    sectionId,
    startOffset,
    endOffset
  })
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