import { Request, Response, NextFunction } from 'express'

import { User } from 'devu-shared-modules'

import UserModel from '../../model/users.model'

import { GenericResponse, Unknown } from '../../utils/apiResponse.utils'

export default function (req: Request, res: Response, next: NextFunction) {
  // No data applied at the controller level
  if (!req.user && !req.users) return res.status(400).json(Unknown)
  if (!req.statusCode) return res.status(400).json(new GenericResponse('Developer error - missing status code'))

  let response

  if (req.users) response = req.users.map(serialize)
  if (req.user) response = serialize(req.user)

  res.status(req.statusCode).json(response)
}

function serialize(user: UserModel): User {
  return {
    id: user.id,
    externalId: user.externalId,
    email: user.email,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
    preferredName: user.preferredName,
  }
}
