var express = require('express');
var router = express.Router();

/* import controller */
const { getAllUsers } = require('../controllers/userController');

/* GET users */
router.get('/', getAllUsers);

module.exports = router;
