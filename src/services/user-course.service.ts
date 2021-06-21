import { getRepository } from 'typeorm'

import { UserCourse as UserCourseType } from 'devu-shared-modules'

import UserCourse from '../model/user-course.model'

const connect = () => getRepository(UserCourse)

export async function create(userCourse: UserCourseType){
  return await connect().save(userCourse)
}

export async function update(userCourse: UserCourseType){
  const {id, user_id, course_id, level, lecture_section, dropped} = userCourse
  return await connect().update(id, {user_id, course_id, level, lecture_section, dropped})
}

export async function _delete(id: number){
  return await connect().softDelete({id, deletedAt: null})
}

export async function retrieve(id: number){
  return await connect().findOne({id, deletedAt: null})
}

export async function list() {
  return await connect().find({deletedAt: null})
}

export default {
  create,
  retrieve,
  update,
  _delete,
  list
}