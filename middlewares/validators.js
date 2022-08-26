const { check } = require('express-validator');

const { validationResult } = require('express-validator');

const { findUserByMail } = require('../services/user');

const { findRoleById } = require('../services/role');

const handleResult = (req, res, next) => {
  try {
    validationResult(req).throw();
    return next();
  } catch (err) {
    return res.status(403).send({ errors: err.array() });
  }
};

const validateUser = [
  check('firstName', 'Escriba su nombre por favor')
    .exists()
    .isLength({ min: 1 })
    .withMessage('Su nombre debe tener entre 1-15 letras')
    .isLength({ max: 15 })
    .withMessage('Su nombre debe tener entre 1-15 letras')
    .trim()
    .escape(),

  check('lastName', 'Escriba su apellido por favor')
    .exists()
    .isLength({ min: 1 })
    .withMessage('Su apellido debe tener entre 1-15 letras')
    .isLength({ max: 15 })
    .withMessage('Su apellido debe tener entre 1-15 letras')
    .trim()
    .escape(),

  check('email', 'Escriba un correo válido por favor')
    .exists()
    .custom(async (value) => {
      const matchedMail = await findUserByMail(value);
      if (matchedMail) {
        throw new Error('Ya existe un usuario con este correo');
      } else {
        return true;
      }
    })
    .isEmail()
    .trim()
    .escape()
    .normalizeEmail(),

  check(
    'password',
    'Su contraseña debe tener al menos 8 caracteres, incluir un número y una letra mayúscula',
  )
    .exists()
    .withMessage('Escriba una contraseña por favor')
    .isLength({ min: 8 })
    .matches(/\d/)
    .matches('[A-Z]')
    .trim()
    .escape(),

  check('passwordConfirmation')
    .exists()
    .withMessage('Escriba nuevamente su contraseña por favor')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Las contraseñas no coinciden');
      } else {
        return true;
      }
    }),

  check('roleId').custom(async (value) => {
    if (value) {
      const matchedRole = await findRoleById(value);
      if (matchedRole === null) {
        throw new Error('role non-existent');
      } else {
        return true;
      }
    } else {
      return true;
    }
  }),

  (req, res, next) => {
    handleResult(req, res, next);
  },
];

module.exports = { validateUser };
