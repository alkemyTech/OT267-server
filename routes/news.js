const express = require('express');

const router = express.Router();

const { validateNewsFields, validateUpdate, validateId } = require('../validators/validateNews');

const { isAuth } = require('../middlewares/isAuth');

const { isAdmin } = require('../middlewares/isAdmin');

const {
  getNewsDetail, createSingleNews, updateSingleNews, deleteSingleNews,
} = require('../controllers/news');

const { uploadFile } = require('../middlewares/uploadFile');

router.get('/:id', isAuth, isAdmin, validateId, getNewsDetail);

router.post('/', isAuth, isAdmin, validateNewsFields, uploadFile, createSingleNews);

router.put('/:id', isAuth, isAdmin, validateUpdate, uploadFile, updateSingleNews);

router.delete('/:id', isAuth, isAdmin, validateId, deleteSingleNews);

module.exports = router;
