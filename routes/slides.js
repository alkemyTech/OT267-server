const express = require('express');

const router = express.Router();

const { isAdmin } = require('../middlewares/isAdmin');
const { isAuth } = require('../middlewares/isAuth');

const {
  getAllSlides,
  updateSlide,
  deleteSlide,
} = require('../controllers/slides');

router.get('/', isAuth, isAdmin, getAllSlides);
router.put('/:id', isAuth, isAdmin, updateSlide);
router.delete('/:id', isAuth, isAdmin, deleteSlide);

module.exports = router;
