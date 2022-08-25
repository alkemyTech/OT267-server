const express = require('express');

const router = express.Router();

const { validateUser } = require('../middlewares/validators');
const { createUser, login } = require('../controllers/auth');


router.post('/register', validateUser, createUser);
router.post('/login', login);
module.exports = router;
