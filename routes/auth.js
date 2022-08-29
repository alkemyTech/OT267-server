const express = require('express');

const router = express.Router();

const { validateUser } = require('../middlewares/validators');

const { register, getUser, login } = require('../controllers/auth');

const { isAuth } = require('../middlewares/isAuth');
/* const { isAdmin } = require('../middlewares/isAdmin'); */
router.get('/me', isAuth, getUser);

router.post('/register', validateUser, register);

router.post('/login', login);

module.exports = router;
