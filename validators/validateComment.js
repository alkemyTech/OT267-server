const { check } = require('express-validator');

const { handleResult } = require('../middlewares');

const { getNewsById } = require('../services/news');

const validateFields = [
  check('body', 'Ingrese el comentario')
    .exists()
    .trim()
    .escape(),
  check('newsId', 'Ingrese el id del post')
    .exists()
    .custom(async (value) => {
      const matchedNews = await getNewsById(value);
      if (value && matchedNews) return true;
      if (value && !matchedNews) throw new Error('No existe un post con este id');
      return true;
    })
    .trim()
    .escape(),
  (req, res, next) => {
    handleResult(req, res, next);
  },
];
module.exports = { validateFields };
