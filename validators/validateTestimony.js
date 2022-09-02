const { check } = require('express-validator');

const { handleResult } = require('../middlewares/validateFields');

const { findTestimonyByPk } = require('../services/testimony');

const validateCreateTestimony = [
  check('name', 'Ingrese un nombre para el testimonio')
    .isString()
    .isLength({ min: 6 })
    .withMessage('El nombre es muy corto, pruebe con otro')
    .trim()
    .escape(),

  check('content', 'Ingrese un contenido para el testimonio')
    .isString()
    .isLength({ min: 100 })
    .withMessage('El contenido debe ser de un minimo de 100 caracteres')
    .trim()
    .escape(),

  (req, res, next) => {
    handleResult(req, res, next);
  },
];

const validateTestimonyParamId = [
  check('id', 'Ingrese el id de la categoría')
    .exists()
    .withMessage('El id de la categoría es requerido')
    .isNumeric()
    .withMessage('El id de la categoría debe ser un número')
    .custom(async (value) => {
      const matchedId = await findTestimonyByPk(value);
      if (!matchedId) {
        throw new Error('Testimonial no existente');
      } else {
        return true;
      }
    }),

  (req, res, next) => {
    handleResult(req, res, next);
  },
];

module.exports = {
  validateCreateTestimony, validateTestimonyParamId,
};
