const express = require('express');

const { getAllTestimonials } = require('../controllers/testimonials');

const router = express.Router();

router.get('/', getAllTestimonials);

module.exports = router;
