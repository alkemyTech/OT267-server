const express = require('express');

const router = express.Router();

const { deleteSingleCategory, update } = require('../controllers/category');
const { isAdmin } = require('../middlewares/isAdmin');
const { isAuth } = require('../middlewares/isAuth');

router.delete('/:id', isAuth, isAdmin, deleteSingleCategory);
router.put('/:id', isAuth, isAdmin, update);
module.exports = router;
