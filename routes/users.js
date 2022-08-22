var express = require('express');
var router = express.Router();
const { deleteSingleUser } = require('../controllers/users'); 

/* GET users listing. */
router.get('/', function(_req, res, next) {
  res.send('respond with a resource');
});

router.delete('/:id', deleteSingleUser);

module.exports = router;
