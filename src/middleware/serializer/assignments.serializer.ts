import { Request, Response, NextFunction } from 'express'

import Assignment from '../../model/assignments.model'
import AssignmentType from '../../shared/types/assignment.type'

import { Unknown } from '../../utils/apiResponse.utils'

export default function(req: Request, res: Response, next: NextFunction) {
  // No data applied at the controller level
  if (!req.assignment && !req.assignments) return res.status(400).json(Unknown)

  const response = req.assignment ? serialize(req.assignment) : req.assignments.map(serialize)

  res.status(req.statusCode).json(response)
}

function serialize(assignment: Assignment): AssignmentType {
  return {
    id: assignment.id,
    course_id: assignment.course_id,
    name: assignment.name,
    start_date: assignment.start_date.toISOString(),
    due_date: assignment.due_date.toISOString(),
    end_date: assignment.end_date.toISOString(),
    grading_type: assignment.grading_type,
    category_name: assignment.category_name,
    description: assignment.description,
    max_file_size: assignment.max_file_size,
    max_submissions: assignment.max_submissions,
    disable_handins: assignment.disable_handins,
    createdAt: assignment.createdAt.toISOString(),
    updatedAt: assignment.updatedAt.toISOString(),
  }
}
