const express = require('express');

const router = express.Router();

const { membersList, createAMember } = require('../controllers/members');

const { isAdmin } = require('../middlewares/isAdmin');

const { isAuth } = require('../middlewares/isAuth');

const { validateCreateMembers } = require('../validators/validateMembers');

router.get('/', isAuth, isAdmin, membersList);
router.post('/', [isAuth, validateCreateMembers], createAMember);

module.exports = router;
