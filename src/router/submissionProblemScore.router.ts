// Libraries
import express from 'express'

// Middleware
import validator from '../middleware/validator/submissionProblemScore.validator'
import { asInt } from '../middleware/validator/generic.validator'

// Controller
import SubmissionProblemScoreController from '../controller/submissionProblemScore.controller'

const Router = express.Router()

/**
 * @swagger
 * /submission-problem-scores:
 *   get:
 *     summary: Retrieve a list of submission problem scores
 */
Router.get('/', SubmissionProblemScoreController.get)

/**
 * @swagger
 * /submission-problem-scores/{id}:
 *   get:
 *     summary: Retrieve a single submission problem score
 */
Router.get('/:id', asInt(), SubmissionProblemScoreController.detail)

/**
 * @swagger
 * /submission-problem-scores:
 *   post:
 *     summary: Create a submission problem score
 */
Router.post('/', validator, SubmissionProblemScoreController.post)

/**
 * @swagger
 * /submission-problem-scores/{id}:
 *   delete:
 *     summary: Delete a submission problem score
 */
Router.delete('/:id', asInt(), SubmissionProblemScoreController._delete)

export default Router
