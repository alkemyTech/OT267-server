const express = require('express');

const router = express.Router();

const { isAdmin, isAuth } = require('../middlewares');

const {
  getRoles, getRole,
} = require('../controllers/roles');

router.get('/', isAuth, isAdmin, getRoles);
router.get('/:id', isAuth, isAdmin, getRole);

module.exports = router;
