var express = require('express');
var router = express.Router();
const { getAllUsers, deleteSingleUser } = require('../controllers/users');
const { isAuth } = require('../middlewares/isAuth');
const { isAdmin } = require('../middlewares/isAdmin');

router.get('/', getAllUsers);

router.delete('/:id', deleteSingleUser);

module.exports = router;
