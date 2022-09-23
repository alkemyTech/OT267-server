const { check } = require('express-validator');

const { handleResult } = require('../middlewares');

const { findByPkCategory } = require('../services/category');

const { findByPkNews } = require('../services/news');

const validateNewsFields = [
  check('name', 'Ingrese el nombre de la novedad')
    .exists()
    .isLength({ min: 1 })
    .trim()
    .escape(),

  check('content', 'Ingrese contenido')
    .exists()
    .isLength({ min: 1 })
    .trim()
    .escape(),

  check('image', 'Ingrese un archivo de imagen')
    .isURL()
    .trim()
    .escape(),

  check('categoryId', 'Ingrese el id de categoría')
    .exists()
    .trim()
    .custom(async (value) => {
      const category = await findByPkCategory(value);
      if (!category) {
        throw new Error('La categoría no existe');
      } else {
        return true;
      }
    }),

  (req, res, next) => {
    handleResult(req, res, next);
  },
];

const validateUpdate = [
  check('id', 'Ingrese el id de la novedad')
    .exists()
    .withMessage('El id de la novedad es requerido')
    .isNumeric()
    .withMessage('El id de la novedad debe ser un número')
    .trim()
    .custom(async (value) => {
      const matchedId = await findByPkNews(value);
      if (!matchedId) {
        throw new Error('La novedad no existe');
      } else {
        return true;
      }
    }),

  check('name', 'Ingrese el nombre de la novedad')
    .optional()
    .isLength({ min: 1 })
    .trim()
    .escape(),

  check('content', 'Ingrese contenido')
    .optional()
    .isLength({ min: 1 })
    .trim()
    .escape(),

  check('image', 'Ingrese un archivo de imagen')
    .optional()
    .isURL()
    .trim()
    .escape(),

  check('categoryId', 'Ingrese un id de categoría')
    .custom(async (value) => {
      if (!value) return true;
      const category = await findByPkCategory(value);
      if (!category) {
        throw new Error('La categoria no existe');
      } else {
        return true;
      }
    }),

  check('body')
    .custom((value, { req }) => {
      if (Object.entries(req.body).length === 0) {
        throw new Error('No hay campos para actualizar');
      } else {
        return true;
      }
    }),

  (req, res, next) => {
    handleResult(req, res, next);
  },
];

const validateId = [
  check('id', 'Ingrese el id de la novedad')
    .exists()
    .withMessage('El id de la novedad es requerido')
    .isNumeric()
    .withMessage('El id de la novedad debe ser un número')
    .trim()
    .custom(async (value) => {
      const matchedId = await await findByPkNews(value);
      if (!matchedId) {
        throw new Error('La novedad no existe');
      } else {
        return true;
      }
    }),

  (req, res, next) => {
    handleResult(req, res, next);
  },
];

module.exports = { validateNewsFields, validateUpdate, validateId };
