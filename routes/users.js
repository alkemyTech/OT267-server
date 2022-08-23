const express = require('express');
const router = express.Router();
const { login } = require('../controllers/users');
const { deleteSingleUser } = require('../controllers/users');
const { getAllUsers } = require('../controllers/userController');

router.get('/', getAllUsers);

router.post('/auth/login', login);

router.delete('/:id', deleteSingleUser);

module.exports = router;
