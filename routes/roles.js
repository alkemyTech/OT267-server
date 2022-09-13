const express = require('express');

const router = express.Router();

const { isAdmin, isAuth } = require('../middlewares');

const {
  getAllRoles, getSingleRole,
} = require('../controllers/roles');

router.get('/', isAuth, isAdmin, getAllRoles);
router.get('/:id', isAuth, isAdmin, getSingleRole);

module.exports = router;
