import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'

import { GenericResponse } from '../../utils/apiResponse.utils'

export function validate(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req)

  if (!errors.isEmpty()) return res.status(400).json(errors.array())

  next()
}

export function idAsInt(req: Request, res: Response, next: NextFunction) {
  if (!req.params.id) return res.status(400).json(new GenericResponse('Missing id param on id required request'))

  const id = parseInt(req.params.id)

  if (isNaN(id)) return res.status(400).json(new GenericResponse('ids are expected to be numbers'))

  next()
}

export default validate
