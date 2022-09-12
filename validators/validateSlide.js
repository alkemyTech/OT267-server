const { check } = require('express-validator');

const { handleResult } = require('../middlewares/validateFields');

const validateCreateSlide = [
  check('text', 'Ingrese el texto de la slide')
    .exists()
    .isLength({ min: 20 })
    .trim()
    .isString()
    .escape(),

  check('image', 'Ingrese una imagen')
    .exists()
    .isString()
    .withMessage('Ingrese una imagen valida'),

  check('order', 'Ingrese el orden de la slide (opcional)')
    .optional({ checkFalsy: true })
    .isNumeric()
    .withMessage('El orden debe ser un numero'),

  check('organizationId', 'Ingrese a que organizacion pertenece la slide')
    .exists()
    .isInt({ min: 1 })
    .withMessage('Debe ingresar una organizacion valida'),

  (req, res, next) => {
    handleResult(req, res, next);
  },
];

module.exports = {
  validateCreateSlide,
};
