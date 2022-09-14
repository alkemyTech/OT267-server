const express = require('express');

const router = express.Router();

const { validateCreateSlide } = require('../validators/validateSlide');

const { decodeImg } = require('../helpers/decodeImg');

const { isAuth, isAdmin, uploadFile } = require('../middlewares');

const {
  createSlide,
  getSlides,
  getSlide,
  updateSlide,
  deleteSlide,
} = require('../controllers/slides');

router.get('/', isAuth, isAdmin, getSlides);
router.get('/:id', isAuth, isAdmin, getSlide);
router.post('/', [isAuth, isAdmin, validateCreateSlide, decodeImg, uploadFile], createSlide);
router.put('/:id', isAuth, isAdmin, updateSlide);
router.delete('/:id', isAuth, isAdmin, deleteSlide);

module.exports = router;
