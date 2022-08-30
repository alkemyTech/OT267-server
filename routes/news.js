const express = require('express');

const router = express.Router();
const { checkCategoryExist } = require('../validators/news');
const { validateNewsFields } = require('../validators/news');
const { isAdmin } = require('../middlewares/isAdmin');
const { isAuth } = require('../middlewares/isAuth');
const { createANews } = require('../controllers/news');
const { updateANews } = require('../controllers/news');

router.post('/', isAuth, isAdmin, validateNewsFields, createANews);
router.put('/:id', isAuth, isAdmin, checkCategoryExist, updateANews);

module.exports = router;
