const express = require('express');

const router = express.Router();

const { isAdmin } = require('../middlewares/isAdmin');
const { isAuth } = require('../middlewares/isAuth');

const {
  getAllContacts,
} = require('../controllers/contacts');

router.get('/', isAuth, isAdmin, getAllContacts);

module.exports = router;
