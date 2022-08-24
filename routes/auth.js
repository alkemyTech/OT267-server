const express = require('express');
const router = express.Router();

const { validateUser } = require('../helpers/validate');
const { createUser } = require('../controllers/auth');

router.post('/register', validateUser, createUser);

module.exports = router;
