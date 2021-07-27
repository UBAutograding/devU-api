// Libraries
import express from 'express'

// Middleware
import validator from '../middleware/validator/asignmentSection.validator'
import { asInt } from '../middleware/validator/generic.validator'

// Controller
import AssignmentSectionController from '../controller/assignmentSections.controller'

const Router = express.Router()

/**
 * @swagger
 * /assignmentSections:
 *   get:
 *     summary: Retrieve a list of assignment sections
 */
Router.get('/', AssignmentSectionController.get)

/**
 * @swagger
 * /assignmentSections/{id}:
 *   get:
 *     summary: Retrieve a single assignment section
 */
Router.get('/:id', asInt(), AssignmentSectionController.detail)

/**
 * @swagger
 * /assignmentSections:
 *   post:
 *     summary: Create an assignment section
 */
Router.post('/', validator, AssignmentSectionController.post)

/**
 * @swagger
 * /assignmentSections/{id}:
 *   delete:
 *     summary: Delete an assignment section
 */
Router.delete('/:id', asInt(), AssignmentSectionController._delete)

export default Router