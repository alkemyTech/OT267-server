const express = require('express');

const router = express.Router();
const { login } = require('../controllers/users');
const { deleteSingleUser } = require('../controllers/users');
const { getAllUsers } = require('../controllers/userController');

// Middlewares prepared for use
const { isAuth } = require('../middlewares/isAuth');
const { isAdmin } = require('../middlewares/isAdmin');

router.get('/', getAllUsers);

router.post('/auth/login', login);

router.delete('/:id', isAuth, isAdmin, deleteSingleUser);

router.get('/', getAllUsers);

router.delete('/:id', deleteSingleUser);

module.exports = router;
