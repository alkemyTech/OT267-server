const express = require('express');

const router = express.Router();

const { validateRegistrationData, validateLoginData } = require('../validators/validateUser');
const { register, getUser, login } = require('../controllers/auth');
const { isAuth, uploadFile } = require('../middlewares');

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Website registered users
 * components:
 *   schemas:
 *     User Model:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           description: User name
 *         lastName:
 *           type: string
 *           description: User lastname
 *         email:
 *           type: string
 *           description: User email
 *         image:
 *           type: string
 *           description: image url
 *         password:
 *           type: string
 *           description: User password
 *         roleId:
 *           type: integer
 *           description: user role
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *         - roleId
 *       example:
 *         firstName: Test
 *         lastName: User
 *         email: superuser@mail.com
 *         image: https://user-image.jpg
 *         password: encripted-password
 *         roleId: 1
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: user id
 *         firstName:
 *           type: string
 *           description: user name
 *         lastName:
 *           type: string
 *           description: user lastname
 *         email:
 *           type: string
 *           description: user email
 *         image:
 *           type: string
 *           description: image url
 *         password:
 *           type: string
 *           description: user password
 *         roleId:
 *           type: integer
 *           description: user role
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *         - roleId
 *       example:
 *         id: 1
 *         firstName: Test
 *         lastName: User
 *         email: superuser@mail.com
 *         image: https://user-image.jpg
 *         password: encripted-password
 *         roleId: 1
 *     RegisterRequest:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           description: User name
 *         lastName:
 *           type: string
 *           description: User lastname
 *         email:
 *           type: string
 *           description: User email
 *         image:
 *           type: string
 *           description: image url
 *         password:
 *           type: string
 *           description: User password
 *         passwordConfirmation:
 *           type: string
 *           description: User password
 *         roleId:
 *           type: integer
 *           description: user role
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *         - passwordConfirmation
 *       example:
 *         firstName: Test
 *         lastName: User
 *         email: superuser@mail.com
 *         image: https://user-image.jpg
 *         password: SuperUser123
 *         passwordConfirmation: SuperUser123
 *         roleId: 1
 *     LoginRequest:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: User email
 *         password:
 *           type: string
 *           description: User password
 *       required:
 *         - email
 *         - password
 *       example:
 *         email: superuser@mail.com
 *         password: SuperUser123
 *     AuthResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: response title
 *         data:
 *           type: object
 *           properties:
 *             user:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: user id
 *                 firstName:
 *                   type: string
 *                   description: user name
 *                 lastName:
 *                   type: string
 *                   description: user lastname
 *                 email:
 *                   type: string
 *                   description: user email
 *                 image:
 *                   type: string
 *                   description: image url
 *                 password:
 *                   type: string
 *                   description: user password
 *                 roleId:
 *                   type: integer
 *                   description: user role
 *             token:
 *               type: string
 *               description: access token
 *     MeResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: response title
 *         data:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: user id
 *             firstName:
 *               type: string
 *               description: user name
 *             lastName:
 *               type: string
 *               description: user lastname
 *             email:
 *               type: string
 *               description: user email
 *             image:
 *               type: string
 *               description: image url
 *             password:
 *               type: string
 *               description: user password
 *             roleId:
 *               type: integer
 *               description: user role
 *   responses:
 *     register:
 *       description: user registered
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthResponse'
 *           example:
 *             message: user created
 *             data:
 *               user:
 *                 id: 1
 *                 firstName: Test
 *                 lastName: User
 *                 email: superuser@mail.com
 *                 image: https://user-image.jpg
 *                 password: encripted-password
 *                 roleId: 1
 *                 token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjYzLC
 *     login:
 *       description: successfull login
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthResponse'
 *           example:
 *             message: successfull login
 *             data:
 *               user:
 *                 id: 1
 *                 firstName: Test
 *                 lastName: User
 *                 email: superuser@mail.com
 *                 image: https://user-image.jpg
 *                 password: encripted-password
 *                 roleId: 1
 *                 token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjYzLC
 *     me:
 *       description: User data
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MeResponse'
 *           example:
 *             message: user data
 *             data:
 *               id: 1
 *               firstName: Test
 *               lastName: User
 *               email: superuser@mail.com
 *               image: https://user-image.jpg
 *               password: encripted-password
 *               roleId: 1
 *     401:
 *       description: unauthorized - id is required
 *     403:
 *       description: forbidden - admin access is required - validation error
 *     500:
 *       description: server error
 *   securitySchemes:
 *     ApiKeyAuth:
 *       in: header
 *       name: authorization
 *       type: apiKey
*/
/**
 * @swagger
 * /auth/me:
 *   get:
 *     security:
 *       - ApiKeyAuth: []
 *     summary: Get user info
 *     tags: [Auth]
 *     responses:
 *       200:
 *         $ref: '#/components/responses/me'
 *       401:
 *         $ref: '#/components/responses/401'
 *       500:
 *         $ref: '#/components/responses/500'
*/
router.get('/me', isAuth, getUser);
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         $ref: '#/components/responses/register'
 *       403:
 *         $ref: '#/components/responses/403'
 *       500:
 *         $ref: '#/components/responses/500'
*/
router.post('/register', validateRegistrationData, uploadFile, register);
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/login'
 *       401:
 *         $ref: '#/components/responses/401'
 *       403:
 *         $ref: '#/components/responses/403'
 *       500:
 *         $ref: '#/components/responses/500'
*/
router.post('/login', validateLoginData, login);

module.exports = router;
