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
 * /submissions:
 *   get:
 *     summary: Retrieve a list of submissions
 */
Router.get('/', SubmissionProblemScoreController.get)

/**
 * @swagger
 * /submissions/{id}:
 *   get:
 *     summary: Retrieve a single submission
 */
Router.get('/:id', asInt(), SubmissionProblemScoreController.detail)

/**
 * @swagger
 * /submissions:
 *   post:
 *     summary: Create a submission
 */
Router.post('/', validator, SubmissionProblemScoreController.post)

/**
 * @swagger
 * /submissions/{id}:
 *   delete:
 *     summary: Delete a submission
 */
Router.delete('/:id', asInt(), SubmissionProblemScoreController._delete)

export default Router
