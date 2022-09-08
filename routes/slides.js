const express = require('express');

const router = express.Router();

const { isAdmin } = require('../middlewares/isAdmin');
const { isAuth } = require('../middlewares/isAuth');

const { validateCreateSlide } = require('../validators/validateSlide');
const { decodeImg } = require('../helpers/decodeImg');

const {
  createSlide,
  getAllSlides,
  getSlideDetail,
  updateSlide,
  deleteSlide,
} = require('../controllers/slides');

router.get('/', isAuth, isAdmin, getAllSlides);
router.get('/:id', isAuth, isAdmin, getSlideDetail);
router.put('/:id', isAuth, isAdmin, updateSlide);
router.delete('/:id', isAuth, isAdmin, deleteSlide);
router.post('/', [isAuth, isAdmin, validateCreateSlide, decodeImg], createSlide);

module.exports = router;
