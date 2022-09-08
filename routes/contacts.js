const express = require('express');

const router = express.Router();

const { validateContact } = require('../validators/validateContact');
const { createNewContact } = require('../controllers/contacts');
const { isAdmin } = require('../middlewares/isAdmin');
const { isAuth } = require('../middlewares/isAuth');

const {
  getAllContacts,
} = require('../controllers/contacts');

router.get('/', isAuth, isAdmin, getAllContacts);

router.post('/', validateContact, createNewContact);

module.exports = router;
