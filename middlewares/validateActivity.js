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

const validateActivity = [
  check('name')
    .exists()
    .trim()
    .escape(),

  check('content')
    .exists()
    .trim()
    .escape(),

  (req, res, next) => {
    handleResult(req, res, next);
  },
];

module.exports = { validateActivity };
