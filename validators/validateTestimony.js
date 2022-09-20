const { check } = require('express-validator');

const { handleResult } = require('../middlewares');

const validateCreateTestimony = [
  check('name', 'Ingrese un nombre para el testimonio')
    .exists()
    .isString()
    .isLength({ min: 6 })
    .withMessage('El nombre es muy corto, pruebe con otro')
    .trim()
    .escape(),

  check('content', 'Ingrese un contenido para el testimonio')
    .exists()
    .isString()
    .isLength({ min: 100 })
    .withMessage('El contenido debe ser de un minimo de 100 caracteres')
    .trim()
    .escape(),

  check('image', 'Ingrese una URL válida')
    .optional()
    .isURL()
    .trim()
    .escape(),

  (req, res, next) => {
    handleResult(req, res, next);
  },
];

module.exports = {
  validateCreateTestimony,
};
