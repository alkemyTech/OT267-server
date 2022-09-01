const express = require('express');

const router = express.Router();

const { validateRegistrationData, validateLoginData } = require('../validators/validateUser');

const { register, getUser, login } = require('../controllers/auth');

const { isAuth } = require('../middlewares/isAuth');

const { uploadFile } = require('../middlewares/uploadFile');

router.get('/me', isAuth, getUser);

router.post('/register', validateRegistrationData, uploadFile, register);

router.post('/login', validateLoginData, login);

module.exports = router;
