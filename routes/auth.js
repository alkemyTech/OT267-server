const express = require('express');
const router = express.Router();

const { validateUser } = require('../validators/auth');
const { createUser } = require('../controllers/auth');

/* POST sign up */
router.post('/register', validateUser, createUser);

module.exports = router;
