const express = require('express');

const router = express.Router();

const { getAllMembers } = require('../controllers/members');

router.get('/', getAllMembers);

module.exports = router;
