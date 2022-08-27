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
  check('name', 'Debe ingresar el nombre de la organizacion')
    .exists()
    .trim()
    .escape(),

  check('phone', 'Debe ingresar un numero de telefono correcto')
    .exists()
    .isMobilePhone()
    .trim()
    .escape(),

  check('address', 'Debe ingresar una direccion')
    .exists()
    .trim()
    .escape(),

  check('image', 'Debe ingresar una imagen')
    .exists()
    .isURL()
    .escape(),

  (req, res, next) => {
    handleResult(req, res, next);
  },
];

module.exports = { validateOrganization };
