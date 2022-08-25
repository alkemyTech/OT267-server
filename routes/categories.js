const express = require('express');

const router = express.Router();

const { deleteSingleCategory } = require('../controllers/category');
const { isAdmin } = require('../middlewares/isAdmin');

router.delete('/:id', deleteSingleCategory);

module.exports = router;
