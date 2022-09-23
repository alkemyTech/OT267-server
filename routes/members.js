const express = require('express');

const router = express.Router();

const { isAdmin, isAuth, isCurrentUser } = require('../middlewares');
const {
  createMember,
  getMembers,
  deleteMember,
  updateMember,
} = require('../controllers/members');

const { validateCreateMembers } = require('../validators/validateMembers');

/**
 *
 * @swagger
 * tags:
 *   - name: Members
 *   - description: ONG Members
 * components:
 *   schemas:
 *     Members Model:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: member name
 *         description:
 *           type: string
 *           description: member description
 *         image:
 *           type: string
 *           description: member image url
 *         facebookUrl:
 *           type: string
 *         instagramUrl:
 *           type: string
 *         linkedinUrl:
 *           type: string
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
 *         - description
 *       example:
 *         name: Member name
 *         description: Member description
 *         image: https://member-image.jpg
 *     MemberResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: response title
 *         data:
 *           type: object
 *           description: response content
 *         properties:
 *           id:
 *             type: integer
 *             description: member
 *           name:
 *             type: string
 *             description: member name
 *           description:
 *             type: string
 *             description: member description
 *           image:
 *             type: string
 *             description: member image url
 *           facebookUrl:
 *             type: string
 *           instagramUrl:
 *             type: string
 *           linkedinUrl:
 *             type: string
 *           deletedAt:
 *             type: date
 *             description: delete date - softdelete
 *           createdAt:
 *             type: date
 *             description: creation date
 *           updatedAt:
 *             type: date
 *             description: update date
 *     MemberRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: member name
 *         description:
 *           type: string
 *           description: member description
 *         image:
 *           type: string
 *           description: member image url
 *         facebookUrl:
 *           type: string
 *         instagramUrl:
 *           type: string
 *         linkedinUrl:
 *           type: string
 *       example:
 *         name: Member name
 *         description: Member description
 *     MemberPutRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: member name
 *         description:
 *           type: string
 *           description: member description
 *         image:
 *           type: string
 *           description: member image url
 *         facebookUrl:
 *           type: string
 *         instagramUrl:
 *           type: string
 *         linkedinUrl:
 *           type: string
 *       example:
 *         name: Member name
 *         description: Member description
 *     Members:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: member id
 *         name:
 *           type: string
 *           description: member name
 *     MembersAndPagination:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: response title
 *         data:
 *           type: object
 *           description: response content
 *         totalPages:
 *           type: integer
 *           description: total number of response pages
 *         previousPage:
 *           type: integer
 *           description: response previous page
 *         currentPage:
 *           type: integer
 *           description: response current page
 *         nextPage:
 *           type: integer
 *           description: response next page
 *         totalRows:
 *           type: integer
 *           description: total number of response rows
 *         rowsPerPage:
 *           type: integer
 *           description: number of response rows per page
 *         rows:
 *           type: array
 *           description: current page rows
 *         items:
 *           $ref: '#/components/schemas/Members'
 *     MessageResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: message
 *   responses:
 *     getAll:
 *       description: list of all members
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MembersAndPagination'
 *           example:
 *             message: members list
 *             data:
 *               totalPages: 1
 *               previousPage: null
 *               currentPage: 1
 *               nextPage: null
 *               totalRows: 2
 *               rowsPerPage: 10
 *               rows:
 *                 - id: 1
 *                   name: Member name
 *                 - id: 2
 *                   name: Member name
 *     delete:
 *       description: delete a member
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MessageResponse'
 *           example:
 *             message: member removed
 *     create:
 *       description: create a member
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MemberResponse'
 *           example:
 *             message: member created succesfully
 *             data:
 *               id: 1
 *               name: Member name
 *               description: Member description
 *               image: https://member-image.jpg
 *               facebookUrl: ""
 *               instagramUrl: ""
 *               linkedinUrl: ""
 *               createdAt: 2022-09-14T17:09:49.000Z
 *               updatedAt: 2022-09-14T17:09:49.000Z
 *     update:
 *       description: update a member
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MemberResponse'
 *           example:
 *             message: member updated succesfully
 *             data:
 *               id: 1
 *               name: Member name
 *               description: Member description
 *               image: https://member-image.jpg
 *               facebookUrl: ""
 *               instagramUrl: ""
 *               linkedinUrl: ""
 *               createdAt: 2022-09-14T17:09:49.000Z
 *               updatedAt: 2022-09-14T17:09:49.000Z
 *     notFound:
 *       description: member not found
 *     badRequest:
 *       description: member already exists
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
 *       description: member id
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
 * /members:
 *   get:
 *     security:
 *       - ApiKeyAuth: []
 *     summary: Get all members
 *     tags: [Member]
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
router.get('/', isAuth, isAdmin, getMembers);

/**
 * @swagger
 * /members:
 *    post:
 *      security:
 *        - ApiKeyAuth: []
 *      summary: Create a member
 *      tags: [Member]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/MemberRequest'
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
router.post('/', [isAuth, validateCreateMembers], createMember);

/**
 * @swagger
 * /members/{id}:
 *    delete:
 *      security:
 *        - ApiKeyAuth: []
 *      summary: Delete a member
 *      tags: [Member]
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
router.delete('/:id', isAuth, isCurrentUser, deleteMember);

/**
 * @swagger
 * /members/{id}:
 *    put:
 *      security:
 *        - ApiKeyAuth: []
 *      summary: Update a member
 *      tags: [Member]
 *      parameters:
 *      - $ref: '#/components/parameters/id'
 *      requestBody:
 *        required: true
 *        content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/MemberRequest'
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
router.put('/:id', isAuth, updateMember);

module.exports = router;
