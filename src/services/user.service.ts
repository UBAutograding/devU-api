import { getRepository, IsNull } from 'typeorm'

import User from '../model/users.model'

import UserType from '../shared/types/user.type'
import { SchoolAuth } from '../shared/types/auth.types'

const connect = () => getRepository(User)

export async function create(user: UserType) {
  return await connect().save(user)
}

export async function update(user: UserType) {
  const { id = '', email, schoolId, preferredName } = user
  return await connect().update(id, { email, schoolId, preferredName })
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

export async function ensure(userInfo: SchoolAuth) {
  const { schoolId, email } = userInfo

  const user = await connect().findOne({ schoolId })

  if (user) return { user, isNewUser: false }

  const newUser = await create({ email, schoolId })

  return { user: newUser, isNewUser: true }
}

export default {
  create,
  retrieve,
  update,
  _delete,
  list,
  ensure,
}
