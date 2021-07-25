import { Request, Response, NextFunction } from 'express'

import CourseSectionService from '../services/courseSection.service'

import { GenericResponse, NotFound, Updated } from '../utils/apiResponse.utils'

import { serialize } from '../utils/serializer/courseSections.serializer'

export async function get(req: Request, res: Response, next: NextFunction) {
  try {
   const courseSections = await CourseSectionService.list()
    const response = courseSections.map(serialize)

    res.status(200).json(response)
  }catch (err){
    next(err)
  }
}

export async function detail(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params.id)
    const courseSection = await CourseSectionService.retrieve(id)

    if (!courseSection) return res.status(404).json(NotFound)

    const response = serialize(courseSection)

    res.status(200).json(response)
  }catch (err){
  next(err)
  }
}

export async function post(req: Request, res: Response, next: NextFunction) {
  try {
    const courseSection = await CourseSectionService.create(req.body)
    const response = serialize(courseSection)

    res.status(201).json(response)
  } catch (err){
  res.status(400).json(new GenericResponse(err.message))
  }
}

export async function put(req: Request, res: Response, next: NextFunction) {
  try {
    req.body.id = parseInt(req.params.id)
    const results = await CourseSectionService.update(req.body)

    if (!results.affected) return res.status(404).json(NotFound)

    res.status(200).json(Updated)
  } catch (err) {
  next(err)
  }
}

export async function _delete(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params.id)
    const results = await CourseSectionService._delete(id)

    if (!results.affected) return res.status(404).json(NotFound)

    res.status(204).send()
  } catch (err){
  next(err)
  }
}

export default { get, detail, post, put, _delete }
