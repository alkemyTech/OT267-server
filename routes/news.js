const express = require('express');

const router = express.Router();

const { isAuth, isAdmin, uploadFile } = require('../middlewares');

const { validateNewsFields, validateUpdate, validateId } = require('../validators/validateNews');

const {
  getSingleNews,
  deleteSingleNews,
  createSingleNews,
  updateSingleNews,
  getAllNews,
  getByNewsComments,
} = require('../controllers/news');

router.get('/:id', isAuth, isAdmin, getSingleNews);

router.post('/', isAuth, isAdmin, uploadFile, validateNewsFields, createSingleNews);

router.put('/:id', isAuth, isAdmin, uploadFile, validateUpdate, updateSingleNews);

router.delete('/:id', isAuth, isAdmin, validateId, deleteSingleNews);

router.get('/', isAuth, getAllNews);

router.get('/:id/comments', isAuth, getByNewsComments);

module.exports = router;
