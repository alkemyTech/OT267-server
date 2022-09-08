const { check } = require('express-validator');

const { handleResult } = require('../middlewares');

const validateContact = [
  check('name', 'El campo name es obligatorio.')
    .exists()
    .trim()
    .escape()
    .not()
    .isEmpty(),

  check('email', 'El campo email es obligatorio')
    .isEmail()
    .withMessage('Por favor, ingrese una dirección de correo valida.')
    .trim()
    .escape()
    .normalizeEmail()
    .not()
    .isEmpty(),

  (req, res, next) => {
    handleResult(req, res, next);
  },
];

module.exports = {
  validateContact,
};
