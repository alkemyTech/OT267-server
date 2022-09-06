const express = require('express');

const { getAllTestimonies, createATestimony, updateTestimony, deleteTestimony } = require('../controllers/testimonials');

const { validateCreateTestimony } = require('../validators/validateTestimony');
const { isAuth } = require('../middlewares/isAuth');
const { isAdmin } = require('../middlewares/isAdmin');

const router = express.Router();

router.get('/', isAuth, isAdmin, getAllTestimonials);
router.post('/', [isAuth, isAdmin, validateCreateTestimony], createATestimony);
router.put('/:id', isAuth, isAdmin, updateTestimony);
router.delete('/:id', isAuth, isAdmin, deleteTestimony);

module.exports = router;
