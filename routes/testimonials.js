const express = require('express');

const router = express.Router();
const { list } = require('../controllers/testimonials');

/* GET testimonials listing. */
router.get('/', list);

module.exports = router;
