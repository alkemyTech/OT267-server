const express = require('express');

const router = express.Router();

const { deleteSingleCategory } = require('../controllers/category');
const { isAdmin } = require('../middlewares/isAdmin');
const { isAuth } = require('../middlewares/isAuth');

router.delete('/:id',isAuth, isAdmin, deleteSingleCategory);

module.exports = router;
