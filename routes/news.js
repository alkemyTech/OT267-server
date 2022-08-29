const express = require('express');

const router = express.Router();
const { isAdmin } = require('../middlewares/isAdmin');
const { isAuth } = require('../middlewares/isAuth');
const { validateNewsFields } = require('../validators/news');
const { createANews } = require('../controllers/news');

router.post('/', isAuth, isAdmin, validateNewsFields, createANews);

module.exports = router;
