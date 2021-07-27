// Libraries
import express from 'express'

// Middleware
import validator from '../middleware/validator/assignmentProblems.validator'
import { asInt } from '../middleware/validator/generic.validator'

// Controller
import AssignmentProblemController from '../controller/assignmentProblems.controller'

const Router = express.Router()

/**
 * @swagger
 * /assignment-problems:
 *   get:
 *     summary: Retrieve a list of assignment problems
 */
Router.get('/', AssignmentProblemController.get)

/**
 * @swagger
 * /assignment-problems/{id}:
 *   get:
 *     summary: Retrieve a single assignment problem
 */
Router.get('/:id', asInt(), AssignmentProblemController.detail)

/**
 * @swagger
 * /assignment-problems:
 *   post:
 *     summary: Create an assignment problem
 */
Router.post('/', validator, AssignmentProblemController.post)

/**
 * @swagger
 * /assignment-problems:
 *   put:
 *     summary: Update an assignment problem
 */
Router.put('/:id', asInt(), validator, AssignmentProblemController.put)

/**
 * @swagger
 * /assignment-problems/{id}:
 *   delete:
 *     summary: Delete an assignment problem
 */
Router.delete('/:id', asInt(), AssignmentProblemController._delete)

export default Router
