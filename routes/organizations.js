var express = require('express');
var router = express.Router();

/* GET organizations listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource from organizations');
});

module.exports = router;
