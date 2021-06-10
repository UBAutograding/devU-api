import { getRepository } from 'typeorm'

import Assignment from '../model/assignments.model'
import AssignmentType from '../shared/types/assignment.type'

const connect = () => getRepository(Assignment)

export async function create(assignment: AssignmentType) {
  return await connect().save(assignment)
}

export async function update(assignment: AssignmentType) {
  const {
    id, course_id, name, start_date, due_date, end_date, grading_type, category_name, description, max_file_size,
    max_submissions, disable_handins,
  } = assignment
  return await connect().update(id, {
    course_id, name, start_date, due_date, end_date, grading_type,
    category_name, description, max_file_size, max_submissions, disable_handins,
  })
}

export async function _delete(id: number) {
  return await connect().softDelete({ id, deletedAt: null })
}

export async function retrieve(id: number) {
  return await connect().findOne({ id, deletedAt: null })
}

export async function list() {
  return await connect().find({ deletedAt: null })
}

export default {
  create,
  retrieve,
  update,
  _delete,
  list,
}
