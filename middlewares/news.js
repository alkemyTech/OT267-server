const { check } = require('express-validator');
const { handleResult } = require('./validateFields');

const { isAdmin } = require('./isAdmin');
const { isAuth } = require('./isAuth');

const validateNewsById = [
  check('id')
    .isNumeric()
    .withMessage('The id must be a number.'),
  handleResult,
  isAuth,
  isAdmin,

];
module.exports = { validateNewsById };
