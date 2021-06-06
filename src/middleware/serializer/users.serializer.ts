import { Request, Response, NextFunction } from 'express'

import User from '../../model/users.model'
import UserType, { LoginUser } from '../../shared/types/user.type'

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

export function loginSerializer(req: Request, res: Response, Next: NextFunction) {
  if (!req.user || !req.auth) return res.status(400).json(Unknown)
  if (!req.statusCode) throw res.status(400).json(new GenericResponse('Developer error - missing status code'))

  const response: LoginUser = {
    user: serialize(req.user),
    auth: req.auth,
  }

  res.status(req.statusCode).json(response)
}

function serialize(user: User): UserType {
  return {
    id: user.id,
    schoolId: user.schoolId,
    email: user.email,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
    preferredName: user.preferredName,
  }
}
