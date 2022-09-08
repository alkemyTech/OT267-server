const express = require('express');

const { getAllTestimonies, createNewTestimony, updateSingleTestimony, deleteSingleTestimony } = require('../controllers/testimonials');

const { validateCreateTestimony } = require('../validators/validateTestimony');
const { isAuth } = require('../middlewares/isAuth');
const { isAdmin } = require('../middlewares/isAdmin');

const router = express.Router();

router.get('/', isAuth, isAdmin, getAllTestimonies);
router.post('/', [isAuth, isAdmin, validateCreateTestimony], createNewTestimony);
router.put('/:id', isAuth, isAdmin, updateSingleTestimony);
router.delete('/:id', isAuth, isAdmin, deleteSingleTestimony);

module.exports = router;
