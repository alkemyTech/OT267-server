const express = require('express');
const router = express.Router();

const { validateCreateSlide } = require('../validators/validateSlide');
const { decodeImg } = require('../helpers/decodeImg');
const { isAuth, isAdmin, uploadFile } = require('../middlewares');

const {
  createSlide,
  getAllSlides,
  getSlideDetail,
  updateSingleSlide,
  deleteSingleSlide,
} = require('../controllers/slides');

router.get('/', isAuth, isAdmin, getAllSlides);
router.get('/:id', isAuth, isAdmin, getSlideDetail);
router.post('/', [isAuth, isAdmin, validateCreateSlide, decodeImg, uploadFile], createSlide);
router.put('/:id', isAuth, isAdmin, updateSingleSlide);
router.delete('/:id', isAuth, isAdmin, deleteSingleSlide);

module.exports = router;
