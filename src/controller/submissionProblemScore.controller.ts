import {SubmissionProblemScore} from 'devu-shared-modules'
import { Request, Response, NextFunction } from 'express'

import SubmissionProblemScoreService from '../services/submissionProblemScore.service'

import { GenericResponse, NotFound } from '../utils/apiResponse.utils'

import { serialize } from '../utils/serializer/submissionProblemScores.serializer'

export async function get(req: Request, res: Response, next: NextFunction) {
    try {
        const submissionProblemScores = await SubmissionProblemScoreService.list()
        const response = submissionProblemScores.map(serialize)

        res.status(200).json(response)
    } catch (err) {
        next(err)
    }
}

export async function detail(req: Request, res: Response, next: NextFunction) {
    try {
        const id = parseInt(req.params.id)
        const submissionProblemScore = await SubmissionProblemScoreService.retrieve(id)
        
        if (!submissionProblemScore) return res.status(404).json(NotFound)

        const response = serialize(submissionProblemScore)
        res.status(200).json(response)
    } catch (err) {
        next(err)
    }
}

export async function post(req: Request, res: Response, next: NextFunction) {
    try {
        if (!req.currentUser?.userId) return res.status(400).json(new GenericResponse('Request requires auth'))

        const requestBody: SubmissionProblemScore = req.body

        requestBody.submitterIp = req.header('x-forwarded-for') || req.socket.remoteAddress
        requestBody.submittedBy = req.currentUser?.userId

        const submissionProblemScore = await SubmissionProblemScoreService.create(requestBody)
        const response = serialize(submissionProblemScore)

        res.status(201).json(response)
    } catch (err) {
        res.status(400).json(new GenericResponse(err.message))
    }
}

export async function _delete(req: Request, res: Response, next: NextFunction) {
    try {
        const id = parseInt(req.params.id)
        const results = await SubmissionProblemScoreService._delete(id)

        if (!results.affected) return res.status(404).json(NotFound)

        res.status(204).send()
    } catch (err) {
        next(err)
    }
}

export default {get, detail, post, _delete}