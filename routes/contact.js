const express = require('express');

const router = express.Router();
const { validateContact } = require('../validators/validateContact');
const { create } = require('../controllers/contact');

router.post('/', validateContact, create);

module.exports = router;
