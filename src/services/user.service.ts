import { getRepository, IsNull } from 'typeorm'

import { User as UserType, DeveloperAuth } from 'devu-shared-modules'

import User from '../model/users.model'

const connect = () => getRepository(User)

export async function create(user: UserType) {
  return await connect().save(user)
}

export async function update(user: UserType) {
  const { id = '', email, externalId, preferredName } = user
  return await connect().update(id, { email, externalId, preferredName })
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

export async function ensure(userInfo: DeveloperAuth) {
  const { externalId, email } = userInfo

  const user = await connect().findOne({ externalId })

  if (user) return { user, isNewUser: false }

  const newUser = await create({ email, externalId })

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
