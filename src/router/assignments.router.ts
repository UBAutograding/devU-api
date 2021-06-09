// Libraries
import express from 'express'

// Middleware
import validator from '../middleware/validator/assignments.validator'
import serializer from '../middleware/serializer/assignments.serializer'
import { idAsInt } from '../middleware/validator/generic.validator'

// Controller
import AssignmentsController from '../controller/assignments.controller'

const Router = express.Router()

/**
 * @swagger
 * /assignments:
 *   get:
 *     summary: Retrieve a list of assignments
 */
Router.get('/', AssignmentsController.get, serializer)

/**
 * @swagger
 * /assignments/{id}:
 *   get:
 *     summary: Retrieve a single assignment
 */
Router.get('/:id', idAsInt, AssignmentsController.detail, serializer)

/**
 * @swagger
 * /assignments:
 *   post:
 *     summary: Create an assignment
 */
Router.post('/', validator, AssignmentsController.post, serializer)

/**
 * @swagger
 * /assignments:
 *   put:
 *     summary: Update an assignment
 */
Router.put('/:id', idAsInt, validator, AssignmentsController.put)

/**
 * @swagger
 * /assignments/{id}:
 *   delete:
 *     summary: Delete an assignment
 */
Router.delete('/:id', idAsInt, AssignmentsController._delete)

export default Router
