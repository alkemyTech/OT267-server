const express = require('express');

const router = express.Router();

const { list, getCategoryById } = require('../controllers/category');
const { validateCategoryById } = require('../middlewares/category');
const { deleteSingleCategory } = require('../controllers/category');
const { isAdmin } = require('../middlewares/isAdmin');
const { isAuth } = require('../middlewares/isAuth');

/* GET categories listing. */
router.get('/', list);
router.get('/:id', validateCategoryById, getCategoryById);

router.delete('/:id', isAuth, isAdmin, deleteSingleCategory);

module.exports = router;
