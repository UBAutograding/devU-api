import { Request, Response, NextFunction } from 'express'

import Assignment from '../../model/assignments.model'
import AssignmentType from '../../shared/types/assignment.type'

import { Unknown } from '../../utils/apiResponse.utils'

export default function (req: Request, res: Response, next: NextFunction) {
  // No data applied at the controller level
  if (!req.assignment && !req.assignments) return res.status(400).json(Unknown)

  const response = req.assignment ? serialize(req.assignment) : req.assignments.map(serialize)

  res.status(req.statusCode).json(response)
}

function serialize(assignment: Assignment): AssignmentType {
  return {
    // TODO
  }
}

// TODO