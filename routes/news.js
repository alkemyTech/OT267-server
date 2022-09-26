const express = require('express');

const router = express.Router();

const { isAuth, isAdmin, uploadFile } = require('../middlewares');

const { validateNewsFields, validateUpdate, validateId } = require('../validators/validateNews');

const {
  getSingleNews,
  deleteSingleNews,
  createSingleNews,
  updateSingleNews,
  getAllNews,
  getCommentsOfSingleNews,
} = require('../controllers/news');
/**
 * @swagger
 * tags:
 *   - name: News
 *     description: ONG News
 * components:
 *  schemas:
 *    News Model:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: news name
 *        content:
 *          type: text
 *          description: news content
 *        image:
 *          type: string
 *          description: the news image
 *        type:
 *          type: string
 *          description: news type
 *        categoryId:
 *          type: integer
 *          description: id of the category
 *      required:
 *        - name
 *        - content
 *        - image
 *        - type
 *      example:
 *        name: A famous person broke up
 *        content: this person is ..., he was dating ..., but finally they broke up
 *        image: https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png
 *        type: news
 *        categoryId: 3
 *    News:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: news id
 *        name:
 *          type: string
 *          description: news name
 *        content:
 *          type: text
 *          description: news content
 *        image:
 *          type: string
 *          description: the news image
 *        type:
 *          type: string
 *          description: news type
 *        categoryId:
 *          type: integer
 *          description: id of the category
 *        comments:
 *          type: array
 *          description: all comments
 *          items:
 *            $ref: '#/components/schemas/Comments'
 *      example:
 *        id: 1
 *        name: A famous person broke up
 *        content: this person is ..., he was dating ..., but finally they broke up
 *        image: https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png
 *        type: news
 *        categoryId: 3
 *    Comments:
 *      type: object
 *      properties:
 *        userId:
 *          type: integer
 *          description: id from the user who commented
 *        body:
 *          type: string
 *          description: body of the comment
 *    NewsAndComments:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: news id
 *        name:
 *          type: string
 *          description: news name
 *        content:
 *          type: text
 *          description: news content
 *        image:
 *          type: string
 *          description: the news image
 *        type:
 *          type: string
 *          description: news type
 *        categoryId:
 *          type: integer
 *          description: id of the category
 *        comments:
 *          type: array
 *          description: array of all comments
 *          items:
 *            $ref: '#/components/schemas/Comments'
 *      example:
 *        id: 1
 *        name: A famous person broke up
 *        content: this person is ..., he was dating ..., but finally they broke up
 *        image: https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png
 *        type: news
 *        categoryId: 3
 *    NewsResponse:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          description: response title
 *        data:
 *          type: object
 *          description: response content
 *          properties:
 *            id:
 *              type: integer
 *            name:
 *              type: string
 *              description: news name
 *            content:
 *              type: text
 *              description: news content
 *            image:
 *              type: string
 *              description: the news image
 *            type:
 *              type: string
 *              description: news type
 *            categoryId:
 *              type: integer
 *              description: id of the category
 *            comments:
 *              type: array
 *              description: all comments
 *              items:
 *                $ref: '#/components/schemas/Comments'
 *    NewsCommentsResponse:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          description: response title
 *        data:
 *          type: array
 *          description: response content
 *          items:
 *            $ref: '#/components/schemas/Comments'
 *  responses:
 *    getAllNews:
 *      description: list of all news
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                description: response title
 *              data:
 *                type: object
 *                description: response content
 *                totalPages:
 *                  type: integer
 *                  description: total number of response pages
 *                previousPage:
 *                  type: integer
 *                  description: response previous page
 *                currentPage:
 *                  type: integer
 *                  description: response current page
 *                nextPage:
 *                  type: integer
 *                  description: response next page
 *                totalRows:
 *                  type: integer
 *                  description: total number of response rows
 *                rowsPerPage:
 *                  type: integer
 *                  description: number of response rows per page
 *                rows:
 *                  type: array
 *                  description: current page rows
 *                items:
 *                  $ref: '#/components/schemas/News'
 *          example:
 *            message: news list
 *            data:
 *              totalPages: 1
 *              previousPage: null
 *              currentPage: 1
 *              nextPage: null
 *              totalRows: 2
 *              rowsPerPage: 10
 *              rows:
 *                - id: 1
 *                  name: A famous person broke up
 *                  content: this person is ..., he was dating ..., but finally they broke up
 *                  image: https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png
 *                  type: news
 *                  categoryId: 3
 *                  comments:
 *                    - id: 2
 *                      body: Interesting...
 *                - id: 2
 *                  name: An other famous person broke up
 *                  content: this person is ..., he was dating ..., but finally they broke up
 *                  image: https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png
 *                  type: news
 *                  categoryId: 3
 *                  comments:
 *                    - id: 2
 *                      body: Woww
 *    getOneNews:
 *      description: news detail
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/NewsResponse'
 *          example:
 *            message: news detail
 *            data:
 *              id: 1
 *              name: A famous person broke up
 *              content: this person is ..., he was dating ..., but finally they broke up
 *              image: https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png
 *              type: news
 *              categoryId: 3
 *              comments:
 *                - id: 2
 *                  body: Woww
 *              createdAt: 2022-09-14T17:09:49.000Z
 *              updatedAt: 2022-09-14T17:09:49.000Z
 *    getComments:
 *      description: news comments
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/NewsCommentsResponse'
 *          example:
 *            message: list of all comments from news {id}
 *            data:
 *              - userId: 1
 *                body: Such a good news
 *              - userId: 2
 *                body: Very interesting
 *    created:
 *      description: create a news
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/NewsResponse'
 *          example:
 *            message: news created
 *            data:
 *              id: 1
 *              name: A famous person broke up
 *              content: this person is ..., he was dating ..., but finally they broke up
 *              image: https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png
 *              type: news
 *              categoryId: 3
 *    updateNews:
 *      description: update a news
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/NewsResponse'
 *          example:
 *            message: news updated
 *            data:
 *              id: 1
 *              name: A famous person broke up
 *              content: this person is ..., he was dating ..., but finally they broke up
 *              image: https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png
 *              type: news
 *              categoryId: 3
 *    deleteNews:
 *      description: news deleted
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                description: message
 *          example:
 *            message: news deleted
 *    401:
 *      description: unauthorized - id is required
 *    403:
 *      description: forbidden - admin access is required - validation error
 *    500:
 *      description: server error
 *  parameters:
 *     NewsId:
 *       in: path
 *       name: id
 *       schema:
 *         type: integer
 *       required: true
 *       description: news id
 *     page:
 *       in: query
 *       name: page
 *       schema:
 *         type: integer
 *       description: page required
 *  securitySchemes:
 *     ApiKeyAuth:
 *       in: header
 *       name: authorization
 *       type: apiKey
 */
/**
 * @swagger
 * /news:
 *   get:
 *    security:
 *      - ApiKeyAuth: []
 *    summary: get all news
 *    tags: [News]
 *    parameters:
 *     - $ref: '#/components/parameters/page'
 *    responses:
 *      200:
 *        $ref: '#/components/responses/getAllNews'
 *      401:
 *        $ref: '#/components/responses/401'
 *      500:
 *        $ref: '#/components/responses/500'
*/
router.get('/', isAuth, getAllNews);
/**
 * @swagger
 * /news:
 *  post:
 *    security:
 *      - ApiKeyAuth: []
 *    summary: create a new news
 *    tags: [News]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/News'
 *    responses:
 *      201:
 *        $ref: '#/components/responses/created'
 *      401:
 *        $ref: '#/components/responses/401'
 *      403:
 *        $ref: '#/components/responses/403'
 *      500:
 *        $ref: '#/components/responses/500'
 *
*/
router.post('/', isAuth, isAdmin, uploadFile, validateNewsFields, createSingleNews);
/**
 * @swagger
 * /news/{id}:
 *   get:
 *    security:
 *      - ApiKeyAuth: []
 *    summary: get news detail
 *    tags: [News]
 *    parameters:
 *     - $ref: '#/components/parameters/NewsId'
 *    responses:
 *      200:
 *        $ref: '#/components/responses/getOneNews'
 *      401:
 *        $ref: '#/components/responses/401'
 *      403:
 *        $ref: '#/components/responses/403'
 *      500:
 *        $ref: '#/components/responses/500'
*/
router.get('/:id', isAuth, isAdmin, validateId, getSingleNews);
/**
 * @swagger
 * /news/{id}:
 *  put:
 *    security:
 *      - ApiKeyAuth: []
 *    summary: Update a news
 *    tags: [News]
 *    parameters:
 *      - $ref: '#/components/parameters/NewsId'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/News'
 *    responses:
 *      201:
 *        $ref: '#/components/responses/updateNews'
 *      401:
 *        $ref: '#/components/responses/401'
 *      403:
 *        $ref: '#/components/responses/403'
 *      500:
 *        $ref: '#/components/responses/500'
*/
router.put('/:id', isAuth, isAdmin, uploadFile, validateUpdate, updateSingleNews);
/**
 * @swagger
 * /news/{id}:
 *    delete:
 *      security:
 *        - ApiKeyAuth: []
 *      summary: Delete a news
 *      tags: [News]
 *      parameters:
 *      - $ref: '#/components/parameters/NewsId'
 *      responses:
 *        200:
 *          $ref: '#/components/responses/deleteNews'
 *        401:
 *          $ref: '#/components/responses/401'
 *        403:
 *          $ref: '#/components/responses/403'
 *        500:
 *          $ref: '#/components/responses/500'
 */
router.delete('/:id', isAuth, isAdmin, validateId, deleteSingleNews);
/**
 * @swagger
 * /news/{id}/comments:
 *  get:
 *    security:
 *      - ApiKeyAuth: []
 *    summary: create a new news
 *    tags: [News]
 *    parameters:
 *     - $ref: '#/components/parameters/page'
 *     - $ref: '#/components/parameters/NewsId'
 *    responses:
 *      200:
 *        $ref: '#/components/responses/getComments'
 *      401:
 *        $ref: '#/components/responses/401'
 *      403:
 *        $ref: '#/components/responses/403'
 *      500:
 *        $ref: '#/components/responses/500'
*/
router.get('/:id/comments', isAuth, getCommentsOfSingleNews);

module.exports = router;
