import { Request, Response, NextFunction } from 'express'

import SubmissionService from '../services/submission.service'

import { GenericResponse, NotFound, Updated } from '../utils/apiResponse.utils'

import { serialize } from '../utils/serializer/submissions.serializer'

export async function get(req: Request, res: Response, next: NextFunction) {
    try {
        const submissions = await SubmissionService.list()
        const response = submissions.map(serialize)

        res.status(200).json(response)
    } catch (err) {
        next(err)
    }
}

export async function detail(req: Request, res: Response, next: NextFunction) {
    try {
        const id = parseInt(req.params.id)
        const submission = await SubmissionService.retrieve(id)

        if (!submission) return res.status(404).json(NotFound)

        const response = serialize(submission)

        res.status(200).json(response)
    } catch (err) {
        next(err)
    }
}

export async function post(req: Request, res: Response, next: NextFunction) {
    try {
        const submission = await SubmissionService.create(req.body)
        const response = serialize(submission)

        res.status(201).json(response)
    } catch (err) {
        res.status(400).json(new GenericResponse(err.message))
    }
}

export async function put(req: Request, res: Response, next: NextFunction) {
    try {
        req.body.id = parseInt(req.params.id)
        const results = await SubmissionService.update(req.body)

        if (!results.affected) return res.status(404).json(NotFound)

        res.status(200).json(Updated)
    } catch (err) {
        next(err)
    }
}

export async function _delete(req: Request, res: Response, next: NextFunction) {
    try {
        const id = parseInt(req.params.id)
        const results = await SubmissionService._delete(id)

        if (!results.affected) return res.status(404).json(NotFound)

        res.status(204).send()
    } catch (err) {
        next(err)
    }
}

export default { get, detail, post, put, _delete }
