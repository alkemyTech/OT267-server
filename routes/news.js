const express = require('express');

const router = express.Router();

const { getNewById } = require('../controllers/news');
const { isAuth } = require('../middlewares/isAuth');
const { isAdmin } = require('../middlewares/isAdmin');

router.get('/:id', [isAuth, isAdmin], getNewById);

module.exports = router;
