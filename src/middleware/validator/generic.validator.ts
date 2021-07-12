import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'

import { GenericResponse } from '../../utils/apiResponse.utils'

export function validate(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req)

  if (!errors.isEmpty()) return res.status(400).json(errors.array())

  next()
}

export function asInt(idName: string) {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!req.params[idName])
      return res
        .status(400)
        .json(new GenericResponse(`Missing  ${idName} param on ${idName} required request`))

    const id = parseInt(req.params[idName])

    if (isNaN(id)) return res.status(400).json(new GenericResponse(idName + ' is expected to be a number'))

    next()
  }
}

export function idAsInt(req: Request, res: Response, next: NextFunction) {
  if (!req.params.id) return res.status(400).json(new GenericResponse('Missing id param on id required request'))

  const id = parseInt(req.params.id)

  if (isNaN(id)) return res.status(400).json(new GenericResponse('ids are expected to be numbers'))

  next()
}

export default validate
