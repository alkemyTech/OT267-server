const express = require('express');

const router = express.Router();

const { isAdmin, isAuth } = require('../middlewares');
const {
  getTestimonies,
  createTestimony,
  updateTestimony,
  deleteTestimony,
} = require('../controllers/testimonies');

const { validateCreateTestimony } = require('../validators/validateTestimony');

router.get('/', isAuth, isAdmin, getTestimonies);

router.post('/', isAuth, isAdmin, validateCreateTestimony, createTestimony);

router.put('/:id', isAuth, isAdmin, updateTestimony);

router.delete('/:id', isAuth, isAdmin, deleteTestimony);

module.exports = router;
