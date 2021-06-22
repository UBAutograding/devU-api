// Libraries
import express from 'express'

// Middleware
import validator from '../middleware/validator/user-course.validator'
import serializer from '../middleware/serializer/user-course.serializer'
import { idAsInt } from '../middleware/validator/generic.validator'

// Controller
import UserCourseController from '../controller/user-course.controller'

const Router = express.Router()

/**
 * @swagger
 * /user-courses:
 *   get:
 *     summary: Retrieve a list of all user-course associations
 */
Router.get('/', UserCourseController.get, serializer)

/**
 * @swagger
 * /user-courses/{id}:
 *   get:
 *     summary: Retrieve a single user-course association
 */
Router.get('/:id', idAsInt, UserCourseController.detail, serializer)

/**
 * @swagger
 * /user-courses:
 *   post:
 *     summary: Create a new user-course association
 */
Router.post('/', validator, UserCourseController.post, serializer)

/**
 * @swagger
 * /users-courses/{id}:
 *   put:
 *     summary: Update a user-course association
 */
Router.put('/:id', idAsInt, validator, UserCourseController.put)

/**
 * @swagger
 * /user-courses/{id}:
 *   delete:
 *     summary: Delete a user-course association
 */
Router.delete('/:id', idAsInt, UserCourseController._delete)

export default Router