const express = require('express');

const { getAllTestimonials, createATestimony, deleteTestimony } = require('../controllers/testimonials');
const { validateCreateTestimony, validateTestimonyParamId } = require('../validators/validateTestimony');
const { isAuth } = require('../middlewares/isAuth');
const { isAdmin } = require('../middlewares/isAdmin');

const router = express.Router();

router.get('/', isAuth, isAdmin, getAllTestimonials);
router.post('/', [isAuth, isAdmin, validateCreateTestimony], createATestimony);
router.delete('/:id', isAuth, isAdmin, validateTestimonyParamId, deleteTestimony);

module.exports = router;
