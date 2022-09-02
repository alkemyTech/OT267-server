const express = require('express');

const router = express.Router();

const { isAdmin } = require('../middlewares/isAdmin');
const { isAuth } = require('../middlewares/isAuth');

const {
  getAllSlides,
} = require('../controllers/slides');

router.get('/', isAuth, isAdmin, getAllSlides);

module.exports = router;
