const express = require('express');

const router = express.Router();

const { isAdmin } = require('../middlewares/isAdmin');
const { isAuth } = require('../middlewares/isAuth');

const {
  getAllSlides, getSlideDetail,
} = require('../controllers/slides');

router.get('/', isAuth, isAdmin, getAllSlides);
router.get('/:id', isAuth, isAdmin, getSlideDetail);

module.exports = router;
