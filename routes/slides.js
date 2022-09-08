const express = require('express');

const router = express.Router();

const { isAdmin } = require('../middlewares/isAdmin');
const { isAuth } = require('../middlewares/isAuth');

const {
  getAllSlides,
  getSlideDetail,
  updateSingleSlide,
  deleteSingleSlide,
} = require('../controllers/slides');

router.get('/', isAuth, isAdmin, getAllSlides);
router.get('/:id', isAuth, isAdmin, getSlideDetail);
router.put('/:id', isAuth, isAdmin, updateSingleSlide);
router.delete('/:id', isAuth, isAdmin, deleteSingleSlide);

module.exports = router;
