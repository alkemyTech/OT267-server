const express = require('express');

const router = express.Router();

const {
  getAllSlides,
} = require('../controllers/slides');

router.get('/', getAllSlides);

module.exports = router;
