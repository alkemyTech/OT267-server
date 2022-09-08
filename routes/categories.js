const express = require('express');

const router = express.Router();

const {
  getCategoryById,
  deleteSingleCategory,
  createNewCategory,
  getAllCategoriesName,
  updateSingleCategory,
} = require('../controllers/categories');

const { validateCategoryId, validateNewsFields } = require('../validators/validateCategory');

const { isAdmin } = require('../middlewares/isAdmin');

const { isAuth } = require('../middlewares/isAuth');

const { uploadFile } = require('../middlewares/uploadFile');

router.get('/:id', isAuth, isAdmin, validateCategoryId, getCategoryById);

router.post('/', isAuth, isAdmin, validateNewsFields, uploadFile, createNewCategory);

router.delete('/:id', isAuth, isAdmin, validateCategoryId, deleteSingleCategory);

router.get('/', isAuth, isAdmin, getAllCategoriesName);

router.put('/:id', isAuth, isAdmin, validateCategoryId, uploadFile, updateSingleCategory);

module.exports = router;
