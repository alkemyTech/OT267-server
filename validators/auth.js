const { User } = require('../models/index');
const { check } = require('express-validator');
const { validateResult } = require('../helpers/validateHelper');

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
            const matchedMail = await User.findOne({ where: { email: value } });
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
        'Su contraseña debe tener al menos 8 caracteres, incluir un número y una letra mayúscula'
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
    (req, res, next) => {
        validateResult(req, res, next);
    },
];

module.exports = { validateUser };
