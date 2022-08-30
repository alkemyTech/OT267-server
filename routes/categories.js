const express = require('express');

const router = express.Router();

const { deleteSingleCategory, getAllCategoriesName } = require('../controllers/category');
const { isAdmin } = require('../middlewares/isAdmin');
const { isAuth } = require('../middlewares/isAuth');

router.delete('/:id', isAuth, isAdmin, deleteSingleCategory);
router.get('/', isAuth, isAdmin, getAllCategoriesName);

module.exports = router;
