const express = require('express');

const router = express.Router();

const { isAdmin, isAuth } = require('../middlewares');
const { validateContact } = require('../validators/validateContact');
const {
  getAllContacts, createNewContact,
} = require('../controllers/contacts');

router.get('/', isAuth, isAdmin, getAllContacts);

router.post('/', validateContact, createNewContact);

module.exports = router;
