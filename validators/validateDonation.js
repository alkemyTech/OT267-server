const { check } = require('express-validator');

const { handleResult } = require('../middlewares');

const validateDonationData = [
  check('amount', 'Ingrese un monto')
    .exists()
    .isInt({ min: 500 })
    .withMessage('El monto debe un entero a partir de 500')
    .trim()
    .escape(),

  (req, res, next) => {
    handleResult(req, res, next);
  },
];

module.exports = { validateDonationData };
