const express = require('express');

const router = express.Router();
const { list } = require('../controllers/categorie');

/* GET categories listing. */
router.get('/', list);

module.exports = router;
