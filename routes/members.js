const express = require('express');

const router = express.Router();

const { isAdmin, isAuth, isCurrentUser } = require('../middlewares');
const { createNewMember, getAllMembers, deleteSingleMember } = require('../controllers/members');
const { validateCreateMembers } = require('../validators/validateMembers');

router.get('/', isAuth, isAdmin, getAllMembers);

router.post('/', [isAuth, validateCreateMembers], createNewMember);

router.delete('/:id', isAuth, isCurrentUser, deleteSingleMember);

module.exports = router;
