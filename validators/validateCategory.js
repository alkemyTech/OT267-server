const { check } = require('express-validator');

const { handleResult } = require('../middlewares/validateFields');

const { categoryFindById } = require('../services/category');

const validateCategoryId = [
  check('id', 'Ingrese el id de la categoría')
    .exists()
    .withMessage('El id de la categoría es requerido')
    .isNumeric()
    .withMessage('El id de la categoría debe ser un número')
    .custom(async (value) => {
      const matchedId = await categoryFindById(value);
      if (!matchedId) {
        throw new Error('Categoría no existente');
      } else {
        return true;
      }
    }),

  (req, res, next) => {
    handleResult(req, res, next);
  },
];
const validateNewsFields = [
  check('name', 'Ingrese el nombre de la categoría')
    .exists()
    .withMessage('El nombre de la categoría es requerido')
    .isAlphanumeric('es-ES', { ignore: ' ' })
    .withMessage('El nombre de la categoría debe ser texto alfanumérico')
    .isLength({ min: 1 })
    .trim()
    .escape(),

  (req, res, next) => {
    handleResult(req, res, next);
  },
];
module.exports = { validateCategoryId, validateNewsFields };
