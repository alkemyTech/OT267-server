const express = require('express');
const router = express.Router();
const { getAllOrg } = require('../controllers/organizations');

/* GET organizations listing. */
router.get('/public', function(req, res, next) {
  return getAllOrg(req, res);
});

module.exports = router;
