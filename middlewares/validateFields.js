const { validationResult } = require('express-validator');

const handleResult = (req, res, next) => {
  try {
    validationResult(req).throw();
    return next();
  } catch (err) {
    return res.status(404).json({ errors: err.array() });
  }
};

module.exports = {
  handleResult,
};
