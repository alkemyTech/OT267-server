const express = require('express');

const router = express.Router();
const { list, getCategoryById } = require('../controllers/category');
const { isAdmin } = require('../middlewares/isAdmin');
const { isAuth } = require('../middlewares/isAuth');

/* GET categories listing. */
router.get('/', list);
router.get('/:id',[isAuth, isAdmin], getCategoryById)
module.exports = router;
