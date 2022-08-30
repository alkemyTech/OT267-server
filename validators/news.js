const { check } = require('express-validator');
const { Category } = require('../models/index');
const { handleResult } = require('../helpers/handleResultsValidator');

const validateNewsFields = [
  check('name', 'El campo name es requerido')
    .trim()
    .exists()
    .isLength({ min: 1 })
    .escape(),

  check('content', 'El campo content es requerido')
    .trim()
    .exists()
    .isLength({ min: 1 })
    .escape(),

  check('image', 'El campo image es requerido')
    .trim()
    .exists()
    .isLength({ min: 1 })
    .escape(),

  check('categoryId', 'La categoria no exite')
    .trim()
    .exists()
    .custom(async (value) => {
      const category = await Category.findOne({ where: { id: value } });
      if (!category) {
        throw new Error('la categoria no existe');
      } else {
        return true;
      }
    }),

  (req, res, next) => {
    handleResult(req, res, next);
  },
];

module.exports = { validateNewsFields };
