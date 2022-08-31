const express = require('express');

const router = express.Router();

const { validateNewsFields, checkCategoryExist, validateId } = require('../validators/validateNews');

const { isAuth } = require('../middlewares/isAuth');

const { isAdmin } = require('../middlewares/isAdmin');

const {
  getNewDetail, createANews, updateANews, deleteSingleNews,
} = require('../controllers/news');

router.get('/:id', isAuth, isAdmin, validateId, getNewDetail);

router.post('/', isAuth, isAdmin, validateNewsFields, createANews);

router.put('/:id', isAuth, isAdmin, checkCategoryExist, updateANews);

router.delete('/:id', isAuth, isAdmin, validateId, deleteSingleNews);

module.exports = router;
