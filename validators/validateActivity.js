const { check } = require('express-validator');

const { handleResult } = require('../middlewares');

const validateActivity = [
  check('name', 'Ingrese el nombre de la actividad')
    .exists()
    .withMessage('El nombre de la actividad es requerido')
    .isAlphanumeric('es-ES', { ignore: ' ' })
    .trim()
    .escape(),

  check('content', 'Ingrese el contenido de la actividad')
    .exists()
    .withMessage('El contenido de la actividad es requerido')
    .isAlphanumeric('es-ES', { ignore: ' ' })
    .trim()
    .escape(),

  check('image', 'Ingrese una URL de imagen')
    .optional()
    .isURL()
    .withMessage('Ingresese una URL válida'),

  (req, res, next) => {
    handleResult(req, res, next);
  },
];

module.exports = { validateActivity };
