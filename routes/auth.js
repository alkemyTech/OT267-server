const express = require('express');

const router = express.Router();

const { validateRegistrationData, validateLoginData } = require('../validators/validateUser');

const { register, getUser, login } = require('../controllers/auth');

const { isAuth } = require('../middlewares/isAuth');

router.get('/me', isAuth, getUser);

router.post('/register', validateRegistrationData, register);

router.post('/login', validateLoginData, login);

module.exports = router;
