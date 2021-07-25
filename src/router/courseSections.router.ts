// Libraries
import express from 'express'

// Middleware
import validator from '../middleware/validator/asignmentSection.validator'
import { asInt } from '../middleware/validator/generic.validator'

// Controller
import CourseSectionController from '../controller/courseSections.controller'

const Router = express()._router

/**
 * @swagger
 * /submissions:
 *   get:
 *     summary: Retrieve a list of course sections
 */
Router.get('/', CourseSectionController.get)

/**
 * @swagger
 * /submissions/{id}:
 *   get:
 *     summary: Retrieve a single course section
 */
Router.get('/:id', asInt(), CourseSectionController.detail)

/**
 * @swagger
 * /submissions:
 *   post:
 *     summary: Create an course section
 */
Router.post('/', validator, CourseSectionController.post)

/**
 * @swagger
 * /submissions/{id}:
 *   delete:
 *     summary: Delete an course section
 */
Router.delete('/:id', asInt(), CourseSectionController._delete)

export default Router