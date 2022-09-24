const { check } = require('express-validator');

const { handleResult } = require('../middlewares');

const validateCreateMembers = [
  check('name', 'Ingrese el nombre de la novedad')
    .exists()
    .isString()
    .isLength({ min: 1 })
    .trim()
    .escape(),

  check(['linkedinUrl', 'instagramUrl, facebookurl', 'image'], 'Ingrese una url valida')
    .optional({ checkFalsy: true })
    .isURL()
    .trim(),

  check('description', 'Ingrese una descripcion')
    .exists()
    .isLength({ min: 15 })
    .withMessage('La descripcion es muy corta')
    .trim()
    .escape(),

  (req, res, next) => {
    handleResult(req, res, next);
  },
];

module.exports = {
  validateCreateMembers,
};
