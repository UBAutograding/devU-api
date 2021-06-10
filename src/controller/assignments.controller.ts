import { Request, Response, NextFunction } from 'express'

import AssignmentService from '../services/assignment.service'

import { GenericResponse, NotFound, Updated } from '../utils/apiResponse.utils'
import Assignment from '../model/assignments.model'

export async function get(req: Request, res: Response, next: NextFunction) {
  try {
    req.assignments = await AssignmentService.list()
    req.statusCode = 200

    next()
  } catch (err) {
    next(err)
  }
}

export async function detail(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params.id)
    const assignment = await AssignmentService.retrieve(id)

    if (!assignment) return res.status(404).json(NotFound)

    req.assignment = assignment
    req.statusCode = 200

    next()
  } catch (err) {
    next(err)
  }
}

export async function post(req: Request, res: Response, next: NextFunction) {
  try {
    req.assignment = await AssignmentService.create(req.body)
    req.statusCode = 201

    next()
  } catch (err) {
    res.status(400).json(new GenericResponse(err.message))
  }
}

export async function put(req: Request, res: Response, next: NextFunction) {
  try {
    req.body.id = parseInt(req.params.id)
    const results = await AssignmentService.update(req.body)

    if (!results.affected) return res.status(404).json(NotFound)

    res.status(200).json(Updated)
  } catch (err) {
    next(err)
  }
}

export async function _delete(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params.id)
    const results = await AssignmentService._delete(id)

    if (!results.affected) return res.status(404).json(NotFound)

    res.status(204).send()
  } catch (err) {
    next(err)
  }
}

export default { get, detail, post, put, _delete }
