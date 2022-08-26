/* eslint-disable no-unused-vars */
const express = require('express');

const router = express.Router();

const { getAllUsers, deleteSingleUser } = require('../controllers/users');

// Middlewares prepared for use
const { isAuth } = require('../middlewares/isAuth');
const { isAdmin } = require('../middlewares/isAdmin');

router.get('/', [isAuth, isAdmin], getAllUsers);

router.delete('/:id', deleteSingleUser);

module.exports = router;
