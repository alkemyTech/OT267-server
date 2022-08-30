const { check } = require('express-validator');
const { Category } = require('../models/index');
const { handleResult } = require('../helpers/hendleResultsValidator');

const validateNewsFields = [
  check('name', 'Escriba el nombre de noticia por favor')
    .trim()
    .exists()
    .isLength({ min: 1 })
    .escape(),

  check('content', 'Escriba un contenido de noticia por favor')
    .trim()
    .exists()
    .isLength({ min: 1 })
    .escape(),

  check('image', 'coloque una ruta de imagen válido por favor')
    .trim()
    .exists()
    .isLength({ min: 1 })
    .escape(),

  check('categoryId', 'Escriba un id de categoria valido')
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

const checkCategoryExist = [
  check('categoryId', 'Escriba un id de categoria valido')
    .trim()
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

module.exports = { validateNewsFields, checkCategoryExist };
