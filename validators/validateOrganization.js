const { check } = require('express-validator');

const { handleResult } = require('../middlewares/validateFields');

const validateOrganization = [
  check('name', 'Ingrese el nombre de la organizacion')
    .optional({ checkFalsy: true })
    .trim()
    .isString()
    .escape(),

  check('email', 'Ingrese un email')
    .optional({ checkFalsy: true })
    .isEmail()
    .withMessage('Ingrese un email válido')
    .trim()
    .escape(),

  check('phone', 'Ingrese un número de teléfono')
    .optional({ checkFalsy: true })
    .isMobilePhone()
    .withMessage('Debe ingresar un número de teléfono válido')
    .trim()
    .escape(),

  check('address', 'Ingrese una dirección')
    .optional({ checkFalsy: true })
    .isString()
    .trim()
    .escape(),

  check('image', 'Ingrese una URL de imagen')
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage('Ingresese una URL válida')
    .escape(),

  check('aboutUsText', 'Ingrese una descripcion')
    .optional({ checkFalsy: true })
    .isString()
    .isLength({ min: 100 })
    .withMessage('Ingresar una descripcion con 100 caracteres mínimo')
    .trim()
    .escape(),

  check('welcomeText', 'Ingrese un mensaje de bienvenida')
    .optional({ checkFalsy: true })
    .isString()
    .isLength({ min: 12 })
    .withMessage('Ingrese un mensaje con  20 caracteres mínimo')
    .trim()
    .escape(),

  (req, res, next) => {
    handleResult(req, res, next);
  },
];

module.exports = { validateOrganization };
