const express = require('express');

const router = express.Router();

const { isAuth, isAdmin, uploadFile } = require('../middlewares');
const { validateNewsFields, validateUpdate, validateId } = require('../validators/validateNews');
const {
  getNewsDetail,
  createSingleNews,
  updateSingleNews,
  deleteSingleNews,
} = require('../controllers/news');

router.get('/:id', isAuth, isAdmin, validateId, getNewsDetail);

router.post('/', isAuth, isAdmin, validateNewsFields, uploadFile, createSingleNews);

router.put('/:id', isAuth, isAdmin, validateUpdate, uploadFile, updateSingleNews);

router.delete('/:id', isAuth, isAdmin, validateId, deleteSingleNews);

module.exports = router;
