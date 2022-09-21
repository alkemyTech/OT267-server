const express = require('express');

const router = express.Router();

const { isAdmin, isAuth, isCurrentUser } = require('../middlewares');
const {
  createMember,
  getMembers,
  deleteMember,
  updateMember,
} = require('../controllers/members');

const { validateCreateMembers } = require('../validators/validateMembers');

router.get('/', isAuth, isAdmin, getMembers);

router.post('/', [isAuth, validateCreateMembers], createMember);

router.delete('/:id', isAuth, isCurrentUser, deleteMember);

router.put('/:id', isAuth, updateMember);

module.exports = router;
