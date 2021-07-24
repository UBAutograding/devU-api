import { getRepository, IsNull } from 'typeorm'

import CourseSectionModels from '../model/courseSections.model'

import { CourseSection } from 'devu-shared-modules'

const connect = () => getRepository(CourseSectionModels)

export async function create(courseSection: CourseSection) {
  return await connect().save(courseSection)
}

export async function update(courseSection: CourseSection) {
  const { id, sectionId, courseId, startDate, endDate} = courseSection
  if (!id) throw  new  Error('Missing Id')
  return await connect().update(id, { sectionId, courseId, startDate, endDate})
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