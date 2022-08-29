const express = require('express');

const router = express.Router();
const { list, getCategoryById } = require('../controllers/category');
const { validateCategoryById } = require('../middlewares/category');



/* GET categories listing. */
router.get('/', list);
router.get('/:id',validateCategoryById, getCategoryById)
module.exports = router;
