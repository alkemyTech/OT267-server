const express = require('express');

const router = express.Router();

const { isAdmin, isAuth } = require('../middlewares');

const {
  getTestimonies,
  createTestimony,
  updateTestimony,
  deleteTestimony,
} = require('../controllers/testimonies');

const { validateCreateTestimony } = require('../validators/validateTestimony');

/**
 * @swagger
 * tags:
 *   - name: Testimony
 *     description: Users Testimonies
 * components:
 *   schemas:
 *     Testimony Model:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: testimony name
 *           required: true
 *         content:
 *           type: string
 *           description: testimony content
 *         image:
 *           type: string
 *           description: testimony image url
 *         deletedAt:
 *           type: date
 *           description: delete date - softdelete
 *         createdAt:
 *           type: date
 *           description: creation date
 *         updatedAt:
 *           type: date
 *           description: update date
 *       required:
 *         - name
 *         - content
 *       example:
 *         name: Testimony name
 *         description: Testimony description
 *         image: https://testimony-image.jpg
 *     TstimonyResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: response title
 *         data:
 *           type: object
 *           description: response content
 *           properties:
 *             id:
 *               type: integer
 *               description: testimony id
 *             name:
 *               type: string
 *               description: testimony name
 *             content:
 *               type: string
 *               description: testimony content
 *             image:
 *               type: string
 *               description: testimony image url
 *             createdAt:
 *               type: date
 *               description: creation date
 *             updatedAt:
 *               type: date
 *               description: update date
 *     TestimonyRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: testimony name
 *           required: true
 *         content:
 *           type: string
 *           description: testimony content
 *           required: true
 *         image:
 *           type: string
 *           description: testimony image url
 *       example:
 *         name: Testimony name
 *         content: Testimony content
 *         image: https://testimony-image.jpg
 *     TestimonyPutRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: testimony name
 *         content:
 *           type: string
 *           description: testimony content
 *         image:
 *           type: string
 *           description: testimony image url
 *       example:
 *         name: Testimony name
 *         content: Testimony content
 *         image: https://testimony-image.jpg
 *     Testimonies:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: testimony id
 *         name:
 *           type: string
 *           description: testimony name
 *         content:
 *           type: string
 *           description: testimony content
 *         image:
 *           type: string
 *           description: testimony image url
 *         createdAt:
 *           type: date
 *           description: creation date
 *         updatedAt:
 *           type: date
 *           description: update date
 *     TestimoniesAndPagination:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: response title
 *         data:
 *           type: object
 *           description: response content
 *           properties:
 *             totalPages:
 *               type: integer
 *               description: total number of response pages
 *             previousPage:
 *               type: integer
 *               description: response previous page
 *             currentPage:
 *               type: integer
 *               description: response current page
 *             nextPage:
 *               type: integer
 *               description: response next page
 *             totalRows:
 *               type: integer
 *               description: total number of response rows
 *             rowsPerPage:
 *               type: integer
 *               description: number of response rows per page
 *             rows:
 *               type: array
 *               description: current page rows
 *               items:
 *                 $ref: '#/components/schemas/Testimonies'
 *     TestimonyMessageResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: message
 *   responses:
 *     getAllTestimonies:
 *       description: list of all testimonies
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TestimoniesAndPagination'
 *           example:
 *             message: list of all testimonies
 *             data:
 *               totalPages: 1
 *               previousPage: null
 *               currentPage: 1
 *               nextPage: null
 *               totalRows: 2
 *               rowsPerPage: 10
 *               rows:
 *                 - id: 1
 *                   name: Testimony name
 *                   content: Testimony content
 *                   image: https://testimony-image.jpg
 *                   createdAt: 2022-09-14T17:09:49.000Z
 *                   updatedAt: 2022-09-14T17:09:49.000Z
 *                 - id: 2
 *                   name: Testimony name
 *                   content: Testimony content
 *                   image: https://testimony-image.jpg
 *                   createdAt: 2022-09-14T17:09:49.000Z
 *                   updatedAt: 2022-09-14T17:09:49.000Z
 *     getSingleTestimony:
 *       description: testimony detail
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TestimonyResponse'
 *           example:
 *             message: testimony detail
 *             data:
 *               id: 1
 *               name: Testimony name
 *               content: Testimony content
 *               image: https://testimony-image.jpg
 *               createdAt: 2022-09-14T17:09:49.000Z
 *               updatedAt: 2022-09-14T17:09:49.000Z
 *     deleteTestimony:
 *       description: testimony deleted
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TestimonyMessageResponse'
 *           example:
 *             message: testimony deleted
 *     createTestimony:
 *       description: testimony created
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TestimonyResponse'
 *           example:
 *             message: testimony created
 *             data:
 *               id: 1
 *               name: Testimony name
 *               content: Testimony content
 *               image: https://testimony-image.jpg
 *               createdAt: 2022-09-14T17:09:49.000Z
 *               updatedAt: 2022-09-14T17:09:49.000Z
 *     updateTestimony:
 *       description: testimony updated
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TestimonyResponse'
 *           example:
 *             message: testimony updated
 *             data:
 *               id: 1
 *               name: Testimony name
 *               description: Testimony description
 *               image: https://testimony-image.jpg
 *               createdAt: 2022-09-14T17:09:49.000Z
 *               updatedAt: 2022-09-14T17:09:49.000Z
 *     notFoundTestimony:
 *       description: testimony not found
 *     badRequestTestimony:
 *       description: testimony already exists
 *     401:
 *       description: unauthorized - id is required
 *     403:
 *       description: forbidden - admin access is required - validation error
 *     500:
 *       description: server error
 *   parameters:
 *     idTestimony:
 *       in: path
 *       name: id
 *       schema:
 *         type: integer
 *       required: true
 *       description: testimony id
 *     page:
 *       in: query
 *       name: page
 *       schema:
 *         type: integer
 *       description: page required
 *     by:
 *       in: query
 *       name: by
 *       schema:
 *         type: string
 *       description: criteria to order rows
 *     order:
 *       in: query
 *       name: order
 *       schema:
 *         type: string
 *       description: direction to order rows
 *   securitySchemes:
 *     ApiKeyAuth:
 *       in: header
 *       name: authorization
 *       type: apiKey
 */

/**
 * @swagger
 * /testimonies:
 *   get:
 *     security:
 *       - ApiKeyAuth: []
 *     summary: Get all testimonies
 *     tags: [Testimony]
 *     parameters:
 *     - $ref: '#/components/parameters/page'
 *     - $ref: '#/components/parameters/by'
 *     - $ref: '#/components/parameters/order'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/getAllTestimonies'
 *       401:
 *         $ref: '#/components/responses/401'
 *       403:
 *         $ref: '#/components/responses/403'
 *       500:
 *         $ref: '#/components/responses/500'
 */

router.get('/', isAuth, isAdmin, getTestimonies);

/**
 * @swagger
 * /testimonies:
 *    post:
 *      security:
 *        - ApiKeyAuth: []
 *      summary: Create a testimony
 *      tags: [Testimony]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TestimonyRequest'
 *      responses:
 *        201:
 *          $ref: '#/components/responses/createTestimony'
 *        400:
 *          $ref: '#/components/responses/badRequestTestimony'
 *        401:
 *          $ref: '#/components/responses/401'
 *        403:
 *          $ref: '#/components/responses/403'
 *        500:
 *          $ref: '#/components/responses/500'
 */

router.post('/', isAuth, isAdmin, validateCreateTestimony, createTestimony);

/**
 * @swagger
 * /testimonies/{id}:
 *    put:
 *      security:
 *        - ApiKeyAuth: []
 *      summary: Update a testimony
 *      tags: [Testimony]
 *      parameters:
 *      - $ref: '#/components/parameters/idTestimony'
 *      requestBody:
 *        required: true
 *        content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/TestimonyPutRequest'
 *      responses:
 *        201:
 *          $ref: '#/components/responses/updateTestimony'
 *        401:
 *          $ref: '#/components/responses/401'
 *        403:
 *          $ref: '#/components/responses/403'
 *        500:
 *          $ref: '#/components/responses/500'
 */

router.put('/:id', isAuth, isAdmin, updateTestimony);

/**
 * @swagger
 * /testimonies/{id}:
 *    delete:
 *      security:
 *        - ApiKeyAuth: []
 *      summary: Delete a testimony
 *      tags: [Testimony]
 *      parameters:
 *      - $ref: '#/components/parameters/idTestimony'
 *      responses:
 *        200:
 *          $ref: '#/components/responses/deleteTestimony'
 *        401:
 *          $ref: '#/components/responses/401'
 *        403:
 *          $ref: '#/components/responses/403'
 *        500:
 *          $ref: '#/components/responses/500'
 */

router.delete('/:id', isAuth, isAdmin, deleteTestimony);

module.exports = router;
