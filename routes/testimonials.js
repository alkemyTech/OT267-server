const express = require('express');

const { getAllTestimonials, createATestimony, updateTestimony } = require('../controllers/testimonials');
const { validateCreateTestimony } = require('../validators/validateTestimony');
const { isAuth } = require('../middlewares/isAuth');
const { isAdmin } = require('../middlewares/isAdmin');

const router = express.Router();

router.get('/', getAllTestimonials);
router.post('/', [isAuth, isAdmin, validateCreateTestimony], createATestimony);
router.put('/:id', isAuth, isAdmin, updateTestimony);

module.exports = router;
