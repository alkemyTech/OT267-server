const express = require('express');
const router = express.Router();
const { list } = require('../controllers/member'); 

/* GET categories listing. */
router.get('/', list);

module.exports = router; 