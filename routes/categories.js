const express = require('express');

const router = express.Router();

const { isAdmin, isAuth, uploadFile } = require('../middlewares');

const {
  deleteCategory,
  getCategory,
  getCategories,
  createCategory,
  updateCategory,
} = require('../controllers/categories');

const { validateCategoryId, validateNewsFields } = require('../validators/validateCategory');

/**
 * @swagger
 * tags:
 *   - name: Category
 *     description: News Category
 * components:
 *   schemas:
 *     Category Model:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: category name
 *         description:
 *           type: string
 *           description: category description
 *         image:
 *           type: string
 *           description: category image url
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
 *       example:
 *         name: Category name
 *         description: Category description
 *         image: https://category-image.jpg
 *     CategoryResponse:
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
 *               description: category id
 *             name:
 *               type: string
 *               description: category name
 *             description:
 *               type: string
 *               description: category description
 *             image:
 *               type: string
 *               description: category image url
 *             createdAt:
 *               type: date
 *               description: creation date
 *             updatedAt:
 *               type: date
 *               description: update date
 *     CategoryRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: category name
 *           required: true
 *         description:
 *           type: string
 *           description: category description
 *         image:
 *           type: string
 *           description: category image url
 *       example:
 *         name: Category name
 *         description: Category description
 *         image: https://category-image.jpg
 *     CategoryPutRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: category name
 *         description:
 *           type: string
 *           description: category description
 *         image:
 *           type: string
 *           description: category image url
 *       example:
 *         name: Category name
 *         description: Category description
 *         image: https://category-image.jpg
 *     Categories:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: category id
 *         name:
 *           type: string
 *           description: category name
 *     CategoriesAndPagination:
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
 *                 $ref: '#/components/schemas/Categories'
 *     MessageResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: message
 *   responses:
 *     getAll:
 *       description: list of all categories
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoriesAndPagination'
 *           example:
 *             message: list of all categories
 *             data:
 *               totalPages: 1
 *               previousPage: null
 *               currentPage: 1
 *               nextPage: null
 *               totalRows: 2
 *               rowsPerPage: 10
 *               rows:
 *                 - id: 1
 *                   name: Category name
 *                 - id: 2
 *                   name: Category name
 *     getSingle:
 *       description: category detail
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoryResponse'
 *           example:
 *             message: category detail
 *             data:
 *               id: 1
 *               name: Category name
 *               description: Category description
 *               image: https://category-image.jpg
 *               createdAt: 2022-09-14T17:09:49.000Z
 *               updatedAt: 2022-09-14T17:09:49.000Z
 *     delete:
 *       description: category deleted
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MessageResponse'
 *           example:
 *             message: category deleted
 *     create:
 *       description: category created
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoryResponse'
 *           example:
 *             message: category created
 *             data:
 *               id: 1
 *               name: Category name
 *               description: Category description
 *               image: https://category-image.jpg
 *               createdAt: 2022-09-14T17:09:49.000Z
 *               updatedAt: 2022-09-14T17:09:49.000Z
 *     update:
 *       description: category updated
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoryResponse'
 *           example:
 *             message: category updated
 *             data:
 *               id: 1
 *               name: Category name
 *               description: Category description
 *               image: https://category-image.jpg
 *               createdAt: 2022-09-14T17:09:49.000Z
 *               updatedAt: 2022-09-14T17:09:49.000Z
 *     notFound:
 *       description: category not found
 *     badRequest:
 *       description: category already exists
 *     401:
 *       description: unauthorized - id is required
 *     403:
 *       description: forbidden - admin access is required - validation error
 *     500:
 *       description: server error
 *   parameters:
 *     id:
 *       in: path
 *       name: id
 *       schema:
 *         type: integer
 *       required: true
 *       description: category id
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
 * /categories:
 *   get:
 *     security:
 *       - ApiKeyAuth: []
 *     summary: Get all categories
 *     tags: [Category]
 *     parameters:
 *     - $ref: '#/components/parameters/page'
 *     - $ref: '#/components/parameters/by'
 *     - $ref: '#/components/parameters/order'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/getAll'
 *       401:
 *         $ref: '#/components/responses/401'
 *       403:
 *         $ref: '#/components/responses/403'
 *       500:
 *         $ref: '#/components/responses/500'
 */

router.get('/', isAuth, isAdmin, getCategories);

/**
 * @swagger
 * /categories/{id}:
 *    get:
 *      security:
 *        - ApiKeyAuth: []
 *      summary: Get a category detail
 *      tags: [Category]
 *      parameters:
 *      - $ref: '#/components/parameters/id'
 *      responses:
 *       200:
 *         $ref: '#/components/responses/getSingle'
 *       401:
 *         $ref: '#/components/responses/401'
 *       403:
 *         $ref: '#/components/responses/403'
 *       500:
 *         $ref: '#/components/responses/500'
 */

router.get('/:id', isAuth, isAdmin, validateCategoryId, getCategory);

/**
 * @swagger
 * /categories:
 *    post:
 *      security:
 *        - ApiKeyAuth: []
 *      summary: Create a category
 *      tags: [Category]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CategoryRequest'
 *      responses:
 *        201:
 *          $ref: '#/components/responses/create'
 *        400:
 *          $ref: '#/components/responses/badRequest'
 *        401:
 *          $ref: '#/components/responses/401'
 *        403:
 *          $ref: '#/components/responses/403'
 *        500:
 *          $ref: '#/components/responses/500'
 */

router.post('/', isAuth, isAdmin, validateNewsFields, uploadFile, createCategory);

/**
 * @swagger
 * /categories/{id}:
 *    put:
 *      security:
 *        - ApiKeyAuth: []
 *      summary: Update a category
 *      tags: [Category]
 *      parameters:
 *      - $ref: '#/components/parameters/id'
 *      requestBody:
 *        required: true
 *        content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/CategoryRequest'
 *
 *      responses:
 *        201:
 *          $ref: '#/components/responses/update'
 *        401:
 *          $ref: '#/components/responses/401'
 *        403:
 *          $ref: '#/components/responses/403'
 *        500:
 *          $ref: '#/components/responses/500'
 */

router.put('/:id', isAuth, isAdmin, validateCategoryId, uploadFile, updateCategory);

/**
 * @swagger
 * /categories/{id}:
 *    delete:
 *      security:
 *        - ApiKeyAuth: []
 *      summary: Delete a category
 *      tags: [Category]
 *      parameters:
 *      - $ref: '#/components/parameters/id'
 *      responses:
 *        200:
 *          $ref: '#/components/responses/delete'
 *        401:
 *          $ref: '#/components/responses/401'
 *        403:
 *          $ref: '#/components/responses/403'
 *        500:
 *          $ref: '#/components/responses/500'
 */

router.delete('/:id', isAuth, isAdmin, validateCategoryId, deleteCategory);

module.exports = router;
