const express = require('express');

const router = express.Router();

const {
  getCategoryById, deleteSingleCategory, createNewCategory, getAllCategoriesName,
} = require('../controllers/category');
const { validateCategoryById } = require('../middlewares/category');
const { isAdmin } = require('../middlewares/isAdmin');
const { isAuth } = require('../middlewares/isAuth');

/* GET categories listing. */
router.get('/:id', validateCategoryById, getCategoryById);
router.post('/', [isAuth, isAdmin], createNewCategory);
router.delete('/:id', isAuth, isAdmin, deleteSingleCategory);
router.get('/', isAuth, isAdmin, getAllCategoriesName);

module.exports = router;
