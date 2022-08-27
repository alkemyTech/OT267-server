const express = require('express');

const router = express.Router();
const { list, createNewCategory } = require('../controllers/categorie');
const { isAuth } = require('../middlewares/isAuth');
const { isAdmin } = require('../middlewares/isAdmin');

/* GET categories listing. */
router.get('/', list);
router.post('/', [isAuth, isAdmin], createNewCategory);

module.exports = router;
