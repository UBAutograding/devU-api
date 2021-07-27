// Libraries
import express from 'express'

// Middleware
import validator from '../middleware/validator/courseSection.validator'
import { asInt } from '../middleware/validator/generic.validator'

// Controller
import CourseSectionController from '../controller/courseSections.controller'

const Router = express.Router()

/**
 * @swagger
 * /courseSections:
 *   get:
 *     summary: Retrieve a list of course sections
 */
Router.get('/', CourseSectionController.get)

/**
 * @swagger
 * /courseSections/{id}:
 *   get:
 *     summary: Retrieve a single course section
 */
Router.get('/:id', asInt(), CourseSectionController.detail)

/**
 * @swagger
 * /courseSections:
 *   post:
 *     summary: Create an course section
 */
Router.post('/', validator, CourseSectionController.post)

/**
 * @swagger
 * /courses:
 *   put:
 *     summary: Update a course
 */
Router.put('/:id', asInt(), validator, CourseSectionController.put)

/**
 * @swagger
 * /courseSections/{id}:
 *   delete:
 *     summary: Delete an course section
 */
Router.delete('/:id', asInt(), CourseSectionController._delete)

export default Router