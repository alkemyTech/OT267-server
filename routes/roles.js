const express = require('express');

const router = express.Router();

const {
  getAllRoles, getSingleRole,
} = require('../controllers/roles');

router.get('/', getAllRoles);
router.get('/:id', getSingleRole);

module.exports = router;
