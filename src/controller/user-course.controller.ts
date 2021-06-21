import { Request, Response, NextFunction } from 'express'

import UserCourseService from '../services/user-course.service'

import { GenericResponse, NotFound, Updated } from '../utils/apiResponse.utils'

export async function get(req: Request, res: Response, next: NextFunction) {
  try {
    req.userCourses = await UserCourseService.list()
    req.statusCode = 200

  } catch (err) {
    next(err)
  }
}

export async function detail(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params.id)
    const userCourse = await UserCourseService.retrieve(id)

    if(!userCourse) return res.status(404).json(NotFound)

    req.userCourse = userCourse
    req.statusCode = 200

  } catch (err) {
    next(err)
  }
}

export async function post(req: Request, res: Response, next: NextFunction){
  try{
    req.userCourse = await UserCourseService.create(req.body)
    req.statusCode = 201

    next()
  }catch(err){
    res.status(400).json(new GenericResponse(err.message))
  }
}

export async function put(req: Request, res: Response, next: NextFunction) {
  try{
    req.body.id = parseInt(req.params.id)
    const results = await  UserCourseService.update(req.body)

    if(!results.affected) return res.status(400).json(NotFound)

    res.status(200).json(Updated)
  }catch(err){
    next(err)
  }
}

export async function _delete(req: Request, res: Response, next: NextFunction) {
  try{
    const id = parseInt(req.params.id)
    const results = await UserCourseService._delete(id)

    if(!results.affected) return res.status(404).json(NotFound)

    res.status(204).send()
  }catch(err){
    next(err)
  }
}

export default { get, detail, post, put, _delete}