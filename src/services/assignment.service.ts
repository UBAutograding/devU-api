import { getRepository, IsNull } from 'typeorm'

import AssignmentModel from '../model/assignments.model'

import { Assignment } from 'devu-shared-modules'

const connect = () => getRepository(AssignmentModel)

export async function create(assignment: Assignment) {
  return await connect().save(assignment)
}

export async function update(assignment: Assignment) {
  const {
    id,
    name,
    startDate,
    dueDate,
    endDate,
    gradingType,
    categoryName,
    description,
    maxFileSize,
    maxSubmissions,
    disableHandins,
  } = assignment

  if (!id) throw new Error('Missing Id')

  return await connect().update(id, {
    name,
    startDate,
    dueDate,
    endDate,
    gradingType,
    categoryName,
    description,
    maxFileSize,
    maxSubmissions,
    disableHandins,
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

type idObj = {
  assignmentId: number,
  courseId: number
}

export async function copy(input: idObj) {
  const assignment = await connect().findOne({ id: input.assignmentId, deletedAt: IsNull() })

  if (!assignment) throw new Error('Missing Id')

  return await connect().insert({
    courseId: input.courseId,
    name: assignment.name,
    startDate: assignment.startDate,
    dueDate: assignment.dueDate,
    endDate: assignment.endDate,
    gradingType: assignment.gradingType,
    categoryName: assignment.categoryName,
    description: assignment.description,
    maxFileSize: assignment.maxFileSize,
    maxSubmissions: assignment.maxSubmissions,
    disableHandins: assignment.disableHandins
  })
}

export default {
  create,
  retrieve,
  update,
  copy,
  _delete,
  list,
}
