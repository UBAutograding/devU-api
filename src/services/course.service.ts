import { getRepository } from 'typeorm'

import Course from '../model/courses.model'
import CourseType from '../shared/types/course.type'

const connect = () => getRepository(Course)

export async function create(course: CourseType) {
  return await connect().save(course)
}

export async function update(course: CourseType) {
  const { id, name, semester, number, start_date, end_date } = course
  return await connect().update(id, { name, semester, number, start_date, end_date })
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
