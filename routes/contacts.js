const express = require('express');

const router = express.Router();

const { isAdmin, isAuth } = require('../middlewares');
const { validateContact } = require('../validators/validateContact');
const {
  getContacts, createContact,
} = require('../controllers/contacts');

router.get('/', isAuth, isAdmin, getContacts);

router.post('/', validateContact, createContact);

module.exports = router;
