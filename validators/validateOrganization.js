const { check } = require('express-validator');

const { validationResult } = require('express-validator');

const handleResult = (req, res, next) => {
  try {
    validationResult(req).throw();
    return next();
  } catch (err) {
    return res.status(403).send({ errors: err.array() });
  }
};

const validateOrganization = [
  check('name', 'Ingrese el nombre de la organizacion')
    .optional({ checkFalsy: true })
    .trim()
    .isString()
    .escape(),

  check('email', 'Ingrese un email')
    .optional({ checkFalsy: true })
    .isEmail()
    .withMessage('Debe ingresar un email valido')
    .trim()
    .escape(),

  check('phone', 'Ingrese un numero de telefono')
    .optional({ checkFalsy: true })
    .isMobilePhone()
    .withMessage('Debe ingresar un numero de telefono correcto')
    .trim()
    .escape(),

  check('address', 'Ingrese una direccion')
    .optional({ checkFalsy: true })
    .isString()
    .trim()
    .escape(),

  check('image', 'Ingrese una URL de imagen')
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage('Debe ingresar URL')
    .escape(),

  check('aboutUsText', 'Ingrese una descripcion')
    .optional({ checkFalsy: true })
    .isString()
    .isLength({ min: 100 })
    .withMessage('Debe ingresar una descripcion con un minimo de 100 caracteres')
    .trim()
    .escape(),

  check('welcomeText', 'Ingrese un mensaje de bienvenida')
    .optional({ checkFalsy: true })
    .isString()
    .isLength({ min: 12 })
    .withMessage('Debe ingresar un mensaje con un minimo de 20 caracteres')
    .trim()
    .escape(),

  (req, res, next) => {
    handleResult(req, res, next);
  },
];

module.exports = { validateOrganization };
