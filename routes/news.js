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

router.get('/:id', isAuth, isAdmin, validateId, getSingleNews);

router.post('/', isAuth, isAdmin, validateNewsFields, uploadFile, createSingleNews);

router.put('/:id', isAuth, isAdmin, validateUpdate, uploadFile, updateSingleNews);

router.delete('/:id', isAuth, isAdmin, validateId, deleteSingleNews);

router.get('/', isAuth, getAllNews);

router.get('/:id/comments', isAuth, getByNewsComments);

module.exports = router;
