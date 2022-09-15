const express = require('express');

const router = express.Router();

const { isAdmin, isAuth, uploadFile } = require('../middlewares');
const {
  deleteCategory,
  getCategory,
  getCategories,
  createCategory,
  updateCategory,
} = require('../controllers/categories');
const { validateCategoryId, validateNewsFields } = require('../validators/validateCategory');

router.get('/:id', isAuth, isAdmin, validateCategoryId, getCategory);

router.post('/', isAuth, isAdmin, validateNewsFields, uploadFile, createCategory);

router.delete('/:id', isAuth, isAdmin, validateCategoryId, deleteCategory);

router.get('/', isAuth, isAdmin, getCategories);

router.put('/:id', isAuth, isAdmin, validateCategoryId, uploadFile, updateCategory);

module.exports = router;
