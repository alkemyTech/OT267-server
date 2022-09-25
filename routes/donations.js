const express = require('express');

const router = express.Router();

const { isAuth, isAdmin } = require('../middlewares');

const {
  getDonations,
  getSingleDonation,
  createDonationLink,
  createSubscriptionLink,
  saveDonationData,
} = require('../controllers/donations');

const { validateDonationData } = require('../validators/validateDonation');

/**
 * @swagger
 * tags:
 *   - name: Donation
 *     description: Users Donations
 * components:
 *   schemas:
 *     DonationRequest:
 *       type: object
 *       properties:
 *         amount:
 *           type: integer
 *       required:
 *         - amount
 *       example:
 *         amount: 1000
 *     Donation:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: donation id
 *         data_id:
 *           type: string
 *           description: data id
 *         type:
 *           type: string
 *           description: payment type
 *         action:
 *           type: string
 *           description: payment status
 *         mp_userId:
 *           type: string
 *           description: mercado pago user id
 *         date_created:
 *           type: string
 *           description: date payment created
 *         createdAt:
 *           type: string
 *           description: date row created
 *         updatedAt:
 *           type: string
 *           description: date row updated
 *         deletedAt:
 *           type: string
 *           nullable: true
 *           description: soft delete
 *     DonationsAndPagination:
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
 *                 $ref: '#/components/schemas/Donation'
 *     SingleDonationResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: response title
 *         data:
 *           type: object
 *           properties:
 *             additional_info:
 *               type: string
 *               description: additional information
 *             auto_return:
 *               type: string
 *               description: additional information
 *             back_urls:
 *               type: object
 *               properties:
 *                 failure:
 *                   type: string
 *                   description: redirection url according donation status
 *                 pending:
 *                   type: string
 *                   description: redirection url according donation status
 *                 success:
 *                   type: string
 *                   description: redirection url according donation status
 *             binary_mode:
 *               type: boolean
 *               description: binary_mode
 *             client_id:
 *               type: string
 *               description: client_id
 *             collector_id:
 *               type: integer
 *               description: collector_id
 *             coupon_code:
 *               type: boolean
 *               nullable: true
 *               description: coupon_code
 *             coupon_labels:
 *               type: boolean
 *               nullable: true
 *               description: coupon_labels
 *             date_created:
 *               type: string
 *               format: date-time
 *               description: date_created
 *             date_of_expiration:
 *               type: string
 *               nullable: true
 *               description: date_of_expiration
 *             expiration_date_from:
 *               type: string
 *               nullable: true
 *               description: expiration_date_from
 *             expiration_date_to:
 *               type: string
 *               nullable: true
 *               description: expiration_date_to
 *             expires:
 *               type: boolean
 *               description: expires
 *             external_reference:
 *               type: string
 *               description: external_reference
 *             id:
 *               type: string
 *               description: id
 *             init_point:
 *               type: string
 *               description: donation link
 *             internal_metadata:
 *               type: string
 *               description: internal metadata
 *               nullable: true
 *             items:
 *               type: array
 *               description: donation
 *               items:
 *                 id:
 *                   type: string
 *                   description: donation id
 *                 category_id:
 *                   type: string
 *                   description: donation category
 *                 currency_id:
 *                   type: string
 *                   description: currency
 *                 description:
 *                   type: string
 *                   description: donation description
 *                 title:
 *                   type: string
 *                   description: title
 *                 quantity:
 *                   type: integer
 *                   description: quantity
 *                 unit_price:
 *                   type: integer
 *                   description: donation amount
 *             marketplace:
 *               type: string
 *               description: marketplace
 *             marketplace_fee:
 *               type: integer
 *               description: marketplace fee
 *             metadata:
 *               type: object
 *               description: metadata
 *               properties: {}
 *             notification_url:
 *               type: string
 *               description: notification url
 *             operation_type:
 *               type: string
 *               description: payment type
 *             payer:
 *               type: object
 *               description: donor user
 *               properties:
 *                 phone:
 *                   type: object
 *                   description: user phone
 *                   properties:
 *                     area_code:
 *                       type: string
 *                       description: area code
 *                     number:
 *                       type: string
 *                       description: number
 *                 address:
 *                   type: object
 *                   description: user address
 *                   properties:
 *                     zip_code:
 *                       type: string
 *                       description: address code
 *                     street_name:
 *                       type: string
 *                       description: address street name
 *                     street_number:
 *                       type: string
 *                       nullable: true
 *                       description: address street number
 *                 email:
 *                   type: string
 *                   description: user email
 *                 identification:
 *                   type: object
 *                   description: user identification
 *                   properties:
 *                     number:
 *                       type: string
 *                       description: identification number
 *                     type:
 *                       type: string
 *                       description: identification type
 *                 name:
 *                   type: string
 *                   description: user name
 *                 surname:
 *                   type: string
 *                   description: user surname
 *                 date_created:
 *                   type: string
 *                   nullable: true
 *                   description: date created
 *                 last_purchase:
 *                   type: string
 *                   nullable: true
 *                   description: last purchase
 *             payment_methods:
 *               type: object
 *               description: payment methods
 *               properties:
 *                 default_card_id:
 *                   type: string
 *                   description: default card id
 *                   nullable: true
 *                 default_payment_method_id:
 *                   type: string
 *                   description: default payment method id
 *                   nullable: true
 *                 excluded_payment_methods:
 *                   type: array
 *                   description: excluded_payment_methods
 *                   items:
 *                     id:
 *                       type: string
 *                 excluded_payment_types:
 *                   type: array
 *                   description: excluded_payment_types
 *                   items:
 *                     id:
 *                       type: string
 *                 installments:
 *                   type: integer
 *                   description: installments
 *                 default_installments:
 *                   type: string
 *                   nullable: true
 *                   description: default installments
 *             processing_modes:
 *               type: string
 *               nullable: true
 *               description: processing modes
 *             product_id:
 *               type: string
 *               nullable: true
 *               description: product id
 *             redirect_urls:
 *               type: object
 *               description: redirect urls
 *               properties:
 *                 failure:
 *                   type: string
 *                   description: failure case
 *                 pending:
 *                   type: string
 *                   description: pending case
 *                 success:
 *                   type: string
 *                   description: success case
 *             sandbox_init_point:
 *               type: string
 *               description: sandbox initpoint
 *             site_id:
 *               type: string
 *               description: site id
 *             shipments:
 *               type: object
 *               description: shipments
 *               properties:
 *                 default_shipping_method:
 *                   type: string
 *                   description: default shipping method
 *                 receiver_address:
 *                   type: object
 *                   description: receiver address
 *                   properties:
 *                     zip_code:
 *                       type: string
 *                       description: zip code
 *                     street_name:
 *                       type: string
 *                       description: streetname
 *                     street_number:
 *                       type: string
 *                       nullable: true
 *                       description: street number
 *                     floor:
 *                       type: string
 *                       description: floor
 *                     apartment:
 *                       type: string
 *                       description: apartment
 *                     city_name:
 *                       type: string
 *                       nullable: true
 *                       description: city name
 *                     state_name:
 *                       type: string
 *                       nullable: true
 *                       description: state name
 *                     country_name:
 *                       type: string
 *                       nullable: true
 *                       description: country name
 *             statement_descriptor:
 *               type: string
 *               description: statement_descriptor
 *             total_amount:
 *               type: string
 *               description: total amount
 *               nullable: true
 *             last_updated:
 *               type: string
 *               description: last_updated
 *               nullable: true
 *     SubscriptionResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: response title
 *         data:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               description: id
 *             payer_id:
 *               type: integer
 *               description: payer id
 *             payer_email:
 *               type: string
 *               description: payer email
 *             back_urls:
 *               type: string
 *               description: redirection url
 *             collector_id:
 *               type: integer
 *               description: collector id
 *             application_id:
 *               type: integer
 *               description: application id
 *             status:
 *               type: string
 *               description: payment status
 *             reason:
 *               type: boolean
 *               description: reason
 *             date_created:
 *               type: string
 *               format: date-time
 *               description: date payment created
 *             last_modified:
 *               type: string
 *               format: date-time
 *               description: last modification date
 *             init_point:
 *               type: string
 *               description: donation link
 *             auto_recurring:
 *               type: object
 *               description: metadata
 *               properties:
 *                 frequency:
 *                   type: integer
 *                   description: payment frecuency
 *                 frequency_type:
 *                   type: string
 *                   description: payment periodicity
 *                 transaction_amount:
 *                   type: integer
 *                   description: payment amount
 *                 currency_id:
 *                   type: string
 *                   description: payment currency
 *                 free_trial:
 *                   type: string
 *                   nullable: true
 *                   description: free trial
 *             sumarized:
 *               type: object
 *               description: donor user
 *               properties:
 *                 quotas:
 *                   type: integer
 *                   nullable: true
 *                   description: quotas
 *                 charged_quantity:
 *                   type: integer
 *                   nullable: true
 *                   description: charged quantity
 *                 pending_charge_quantity:
 *                   type: integer
 *                   nullable: true
 *                   description: pending charge quantity
 *                 charged_amount:
 *                   type: integer
 *                   nullable: true
 *                   description: charged amount
 *                 pending_charge_amount:
 *                   type: integer
 *                   nullable: true
 *                   description: pending charge amount
 *                 semaphore:
 *                   type: integer
 *                   nullable: true
 *                   description: semaphore
 *                 last_charged_date:
 *                   type: integer
 *                   nullable: true
 *                   description: last charged date
 *                 last_charged_amount:
 *                   type: integer
 *                   nullable: true
 *                   description: last charged amount
 *             payment_method_id:
 *               type: string
 *               nullable: true
 *               description: payment method id
 *             first_invoice_offset:
 *               type: string
 *               nullable: true
 *               description: first invoice offset
 *   responses:
 *     CreateSubscription:
 *       description: single donation created
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SubscriptionResponse'
 *           example:
 *             message: recurrent donation link
 *             data:
 *               id: "2c93808483727fba018374b0785b0058"
 *               payer_id: 1196391210
 *               payer_email: ""
 *               back_url: "https://es.wikipedia.org/wiki/%C3%89xito"
 *               collector_id: 1196390096
 *               application_id: 2162599167947359
 *               status: "pending"
 *               reason: "Donación mensual"
 *               date_created: "2022-09-25T08:47:45.753-04:00"
 *               last_modified: "2022-09-25T08:47:45.755-04:00"
 *               init_point: "https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_id=2c93808483727fba018374b0785b0058"
 *               auto_recurring:
 *                 frequency: 1
 *                 frequency_type: "months"
 *                 transaction_amount: 1000
 *                 currency_id: "ARS"
 *                 free_trial: null
 *               summarized:
 *                 quotas: null
 *                 charged_quantity: null
 *                 pending_charge_quantity: null
 *                 charged_amount: null
 *                 pending_charge_amount: null
 *                 semaphore: null
 *                 last_charged_date: null
 *                 last_charged_amount: null
 *               payment_method_id: null
 *               first_invoice_offset: null
 *     CreateSingleDonation:
 *       description: single donation created
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SingleDonationResponse'
 *           example:
 *             message: single donation link
 *             data:
 *               additional_info: ''
 *               auto_return: ''
 *               back_urls:
 *                 failure: ''
 *                 pending: ''
 *                 success: ''
 *               binary_mode: false
 *               client_id: '2162599167947359'
 *               collector_id: 1196390096
 *               coupon_code: null
 *               coupon_labels: null
 *               date_created: '2022-09-24T23:11:57.662-04:00'
 *               date_of_expiration: null
 *               expiration_date_from: null
 *               expiration_date_to: null
 *               expires: false
 *               external_reference: 'smong267'
 *               id: '1196390096-4fc17421-fe5b-4a6c-8088-3f7a141bd764'
 *               init_point: 'https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=1196390096-4fc17421-fe5b-4a6c-8088-3f7a141bd764'
 *               internal_metadata: null,
 *               items:
 *                 id: '1'
 *                 category_id: 'single donation'
 *                 currency_id: 'ARS'
 *                 description: Donación única para la ONG Somos Más
 *                 title: Donación única
 *                 quantity: 1
 *                 unit_price: 1500
 *               marketplace: NONE
 *               marketplace_fee: 0
 *               metadata: {}
 *               notification_url: http://undefined/donations/notification
 *               operation_type: regular_payment
 *               payer:
 *                 phone:
 *                   area_code: ""
 *                   number: ""
 *                 address:
 *                   zip_code: ""
 *                   street_name: ""
 *                   street_number: null
 *                 email: ""
 *                 identification:
 *                   number: ""
 *                   type: ""
 *                 name: ""
 *                 surname: ""
 *                 date_created: null,
 *                 last_purchase: null
 *               payment_methods:
 *                 default_card_id: null
 *                 default_payment_method_id: null
 *                 excluded_payment_methods:
 *                   - id: ""
 *                 excluded_payment_types:
 *                   - id: ""
 *                 installments: 1
 *                 default_installments: null
 *               processing_modes: null
 *               product_id: null
 *               redirect_urls:
 *                 failure: ""
 *                 pending: ""
 *                 success: ""
 *               sandbox_init_point: "https://sandbox.mercadopago.com.ar/checkout/v1/redirect?pref_id=1196390096-4fc17421-fe5b-4a6c-8088-3f7a141bd764"
 *               site_id: "MLA"
 *               shipments:
 *                 default_shipping_method: null
 *                 receiver_address:
 *                   zip_code: ""
 *                   street_name: ""
 *                   street_number: null
 *                   floor: ""
 *                   apartment: ""
 *                   city_name: null
 *                   state_name: null
 *                   country_name: null
 *               statement_descriptor: Somos Más ONG
 *               total_amount: null
 *               last_updated: null
 *     getAllDonations:
 *       description: list of all donations
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DonationsAndPagination'
 *           example:
 *             message: list of all donations
 *             data:
 *               totalPages: 1
 *               previousPage: null
 *               currentPage: 1
 *               nextPage: null
 *               totalRows: 2
 *               rowsPerPage: 10
 *               rows:
 *                 - id: 1
 *                   data_id: 1308062372
 *                   type: payment
 *                   action: payment.created
 *                   mp_userId: 1196390096
 *                   date_created: 2022-09-14T17:09:49.000Z
 *                   createdAt: 2022-09-14T17:09:49.000Z
 *                   updatedAt: 2022-09-14T17:09:49.000Z
 *                   deletedAt: null
 *                 - id: 2
 *                   data_id: 1308062372
 *                   type: payment
 *                   action: payment.created
 *                   mp_userId: 1196390096
 *                   date_created: 2022-09-14T17:09:49.000Z
 *                   createdAt: 2022-09-14T17:09:49.000Z
 *                   updatedAt: 2022-09-14T17:09:49.000Z
 *                   deletedAt: null
 *     401:
 *       description: unauthorized - id is required
 *     403:
 *       description: forbidden - admin access is required - validation error
 *     500:
 *       description: server error
 *   parameters:
 *     idDonation:
 *       in: path
 *       name: id
 *       schema:
 *         type: integer
 *       required: true
 *       description: donation id
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
 * /donations:
 *   get:
 *     security:
 *       - ApiKeyAuth: []
 *     summary: Get all donations
 *     tags: [Donation]
 *     parameters:
 *     - $ref: '#/components/parameters/page'
 *     - $ref: '#/components/parameters/by'
 *     - $ref: '#/components/parameters/order'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/getAllDonations'
 *       401:
 *         $ref: '#/components/responses/401'
 *       403:
 *         $ref: '#/components/responses/403'
 *       500:
 *         $ref: '#/components/responses/500'
 */
router.get('/', isAuth, isAdmin, getDonations);

router.get('/:id', isAuth, isAdmin, getSingleDonation);

/**
 * @swagger
 * /donations/singledonation:
 *    post:
 *      security:
 *        - ApiKeyAuth: []
 *      summary: Create a single donation link
 *      tags: [Donation]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/DonationRequest'
 *      responses:
 *        200:
 *          $ref: '#/components/responses/CreateSingleDonation'
 *        401:
 *          $ref: '#/components/responses/401'
 *        403:
 *          $ref: '#/components/responses/403'
 *        500:
 *          $ref: '#/components/responses/500'
 */

router.post('/singledonation', isAuth, validateDonationData, createDonationLink);

/**
 * @swagger
 * /donations/subscription:
 *    post:
 *      security:
 *        - ApiKeyAuth: []
 *      summary: Create a recurrent donation link for subscription
 *      tags: [Donation]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/DonationRequest'
 *      responses:
 *        200:
 *          $ref: '#/components/responses/CreateSubscription'
 *        401:
 *          $ref: '#/components/responses/401'
 *        403:
 *          $ref: '#/components/responses/403'
 *        500:
 *          $ref: '#/components/responses/500'
 */

router.post('/subscription', isAuth, validateDonationData, createSubscriptionLink);

router.post('/notification', async (req, res, next) => {
  console.log('REQUEST', req);
  res.status(201);
  next();
}, saveDonationData);

module.exports = router;
