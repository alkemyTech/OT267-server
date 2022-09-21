const { check } = require('express-validator');

const { findOneUser } = require('../services/user');

const { findByPkRole } = require('../services/role');

const { handleResult } = require('../middlewares');

const validateRegistrationData = [
  check('firstName', 'Ingrese su nombre')
    .exists()
    .isLength({ min: 1 })
    .withMessage('El nombre debe tener entre 1-30 letras')
    .isLength({ max: 30 })
    .withMessage('El nombre debe tener entre 1-30 letras')
    .trim()
    .escape(),

  check('lastName', 'Ingrese su apellido')
    .exists()
    .isLength({ min: 1 })
    .withMessage('El apellido debe tener entre 1-30 letras')
    .isLength({ max: 30 })
    .withMessage('El apellido debe tener entre 1-30 letras')
    .trim()
    .escape(),

  check('email', 'Ingrese un correo')
    .exists()
    .withMessage('Ingrese un correo')
    .isEmail()
    .withMessage('Ingrese un correo válido')
    .custom(async (value) => {
      const matchedMail = await findOneUser(value);
      if (matchedMail) {
        throw new Error('Ya existe un usuario con este correo');
      } else {
        return true;
      }
    })
    .trim()
    .escape()
    .normalizeEmail(),

  check('image', 'Ingrese una URL de imagen')
    .optional()
    .isURL()
    .withMessage('Ingresese una URL válida'),

  check(
    'password',
    'La contraseña debe tener al menos 8 caracteres, incluir un número y una letra mayúscula',
  )
    .exists()
    .withMessage('Ingrese una contraseña')
    .isLength({ min: 8 })
    .withMessage('La contraseña debe tener al menos 8 caracteres')
    .matches(/\d/)
    .withMessage('La contraseña debe incluir al menos un número')
    .matches('[A-Z]')
    .withMessage('La contraseña debe incluir al menos una letra mayúscula')
    .trim()
    .escape(),

  check('passwordConfirmation')
    .exists()
    .withMessage('Ingrese nuevamente su contraseña')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Las contraseñas deben coinciden');
      } else {
        return true;
      }
    }),

  check('roleId').custom(async (value) => {
    if (value) {
      const matchedRole = await findByPkRole(value);
      if (matchedRole === null) {
        throw new Error('Rol no existente');
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

const validateLoginData = [
  check('email', 'Ingrese un correo')
    .exists()
    .withMessage('Ingrese un correo')
    .isEmail()
    .withMessage('Ingrese un correo válido')
    .custom(async (value) => {
      const matchedMail = await findOneUser(value);
      if (!matchedMail) {
        throw new Error('No existe un usuario con este correo');
      } else {
        return true;
      }
    })
    .trim()
    .escape()
    .normalizeEmail(),

  (req, res, next) => {
    handleResult(req, res, next);
  },
];

const validateFields = [
  check('firstName', 'Ingrese su nombre')
    .optional()
    .isLength({ min: 1 })
    .withMessage('El nombre debe tener entre 1-30 letras')
    .isLength({ max: 30 })
    .withMessage('El nombre debe tener entre 1-30 letras')
    .trim()
    .escape(),

  check('lastName', 'Ingrese su apellido')
    .optional()
    .isLength({ min: 1 })
    .withMessage('El apellido debe tener entre 1-30 letras')
    .isLength({ max: 30 })
    .withMessage('El apellido debe tener entre 1-30 letras')
    .trim()
    .escape(),

  check('email', 'Ingrese un correo')
    .optional()
    .isEmail()
    .withMessage('Ingrese un correo válido')
    .custom(async (value) => {
      const matchedMail = await findOneUser(value);
      if (matchedMail) {
        throw new Error('Ya existe un usuario con este correo');
      } else {
        return true;
      }
    })
    .trim()
    .escape()
    .normalizeEmail(),

  check('image', 'Ingrese una URL de imagen')
    .optional()
    .isURL()
    .withMessage('Ingresese una URL válida'),

  check('roleId').custom(async (value) => {
    if (value) {
      const matchedRole = await findByPkRole(value);
      if (matchedRole === null) {
        throw new Error('Rol no existente');
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
module.exports = { validateRegistrationData, validateLoginData, validateFields };
