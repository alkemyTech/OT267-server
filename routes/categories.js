const express = require('express');

const router = express.Router();

const {
  getCategoryById, deleteSingleCategory, createNewCategory, getAllCategoriesName, update,
} = require('../controllers/categories');

const { validateCategoryId, validateNewsFields } = require('../validators/validateCategory');

const { isAdmin } = require('../middlewares/isAdmin');

const { isAuth } = require('../middlewares/isAuth');

router.get('/:id', isAuth, isAdmin, validateCategoryId, getCategoryById);

router.post('/', isAuth, isAdmin, validateNewsFields, createNewCategory);

router.delete('/:id', isAuth, isAdmin, validateCategoryId, deleteSingleCategory);

router.get('/', isAuth, isAdmin, getAllCategoriesName);

router.put('/:id', isAuth, isAdmin, validateCategoryId, update);

module.exports = router;
