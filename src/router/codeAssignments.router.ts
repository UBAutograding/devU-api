import express from 'express'
import multer from 'multer'

import validator from '../middleware/validator/codeAssignments.validator'
import { asInt } from '../middleware/validator/generic.validator'

import CodeAssignmentController from '../controller/codeAssignments.controller'

const Router = express.Router()
const upload = multer()

/**
 * @swagger
 * /code-assignment:
 *   get:
 *     summary: Retrieve a list of all code assignments
 */
Router.get('/', CodeAssignmentController.get)

/**
 * @swagger
 * /code-assignment/{id}:
 *   get:
 *     summary: Retrieve a single code assignment
 */
Router.get('/:id', asInt(), CodeAssignmentController.detail)

/**
 * @swagger
 * /code-assignment:
 *   post:
 *     summary: Create a new code assignment
 */
Router.post('/', upload.single('graderFile'), validator, CodeAssignmentController.post)

/**
 * @swagger
 * /code-assignment/{id}:
 *   put:
 *     summary: Update a code assignment
 */
Router.put('/:id', asInt(), upload.single('graderFile'), validator, CodeAssignmentController.put)

/**
 * @swagger
 * /code-assignment/{id}:
 *   delete:
 *     summary: Delete a code assignment
 */
Router.delete('/:id', asInt(), CodeAssignmentController._delete)

export default Router
