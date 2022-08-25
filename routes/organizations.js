const express = require('express');

const router = express.Router();
const { getAllOrg } = require('../controllers/organizations');

/* GET organizations listing. */
router.get('/public', (req, res, next) => getAllOrg(req, res));

module.exports = router;
