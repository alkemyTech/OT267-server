const express = require('express');

const router = express.Router();

const { createAMember, membersList, removeMember } = require('../controllers/members');

const { isAdmin } = require('../middlewares/isAdmin');

const { isAuth } = require('../middlewares/isAuth');

const { validateCreateMembers } = require('../validators/validateMembers');

router.get('/', isAuth, isAdmin, membersList);
router.post('/', [isAuth, validateCreateMembers], createAMember);

router.delete('/:id', isAuth, removeMember);

module.exports = router;
