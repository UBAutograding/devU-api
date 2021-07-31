// Libraries
import express from 'express'

// Middleware
import validators from '../middleware/validator/assignments.validator'
const validator = validators.validator
const copyValidator = validators.copyValidator

import { asInt } from '../middleware/validator/generic.validator'

// Controller
import AssignmentsController from '../controller/assignments.controller'

const Router = express.Router()

/**
 * @swagger
 * /assignments:
 *   get:
 *     summary: Retrieve a list of assignments
 */
Router.get('/', AssignmentsController.get)

/**
 * @swagger
 * /assignments/{id}:
 *   get:
 *     summary: Retrieve a single assignment
 */
Router.get('/:id', asInt(), AssignmentsController.detail)

/**
 * @swagger
 * /assignments:
 *   post:
 *     summary: Create an assignment
 */
Router.post('/', validator, AssignmentsController.post)

/**
 * @swagger
 * /assignments/{id}:
 *   copy:
 *     summary: copy an assignment to a new course
 */
Router.copy('/:id', asInt(), copyValidator, AssignmentsController.copy)

/**
 * @swagger
 * /assignments:
 *   put:
 *     summary: Update an assignment
 */
Router.put('/:id', asInt(), validator, AssignmentsController.put)

/**
 * @swagger
 * /assignments/{id}:
 *   delete:
 *     summary: Delete an assignment
 */
Router.delete('/:id', asInt(), AssignmentsController._delete)

export default Router
