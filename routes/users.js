const express = require('express');
const router = express.Router();
const { login } = require('../controllers/users');

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
}); 

router.post('/auth/login', login);

module.exports = router;
