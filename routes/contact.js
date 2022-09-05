const express = require('express');

const router = express.Router();
const { validateContact } = require('../validators/validateContact');
const { createContact } = require('../controllers/contact');

router.post('/', validateContact, createContact);

module.exports = router;
