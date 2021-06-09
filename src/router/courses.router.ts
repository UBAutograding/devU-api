// Libraries
import express from 'express'

// Middleware
import validator from '../middleware/validator/courses.validator'
import serializer from '../middleware/serializer/courses.serializer'
import { idAsInt } from '../middleware/validator/generic.validator'

// Controller
import CourseController from '../controller/courses.controller'

const Router = express.Router()

/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Retrieve a list of courses
 */
Router.get('/', CourseController.get, serializer)

/**
 * @swagger
 * /courses/{id}:
 *   get:
 *     summary: Retrieve a single course
 */
Router.get('/:id', idAsInt, CourseController.detail, serializer)

/**
 * @swagger
 * /courses:
 *   post:
 *     summary: Create a course
 */
Router.post('/', validator, CourseController.post, serializer)

/**
 * @swagger
 * /courses:
 *   put:
 *     summary: Update a course
 */
Router.put('/:id', idAsInt, validator, CourseController.put)

/**
 * @swagger
 * /courses/{id}:
 *   delete:
 *     summary: Delete a course
 */
Router.delete('/:id', idAsInt, CourseController._delete)

export default Router
