const express = require('express');

const router = express.Router();

const { isAdmin, isAuth } = require('../middlewares');
const {
  getAllTestimonies,
  createNewTestimony,
  updateSingleTestimony,
  deleteSingleTestimony,
} = require('../controllers/testimonies');
const { validateCreateTestimony } = require('../validators/validateTestimony');

router.get('/', isAuth, isAdmin, getAllTestimonies);

router.post('/', isAuth, isAdmin, validateCreateTestimony, createNewTestimony);

router.put('/:id', isAuth, isAdmin, updateSingleTestimony);

router.delete('/:id', isAuth, isAdmin, deleteSingleTestimony);

module.exports = router;
