const express = require('express');

const router = express.Router();

const {
  createNewMember,
  getAllMembers,
  deleteSingleMember,
  updateMember,
} = require('../controllers/members');

const { isAdmin, isAuth } = require('../middlewares');

const { validateCreateMembers } = require('../validators/validateMembers');

router.get('/', isAuth, isAdmin, getAllMembers);

router.post('/', [isAuth, validateCreateMembers], createNewMember);

router.put('/:id', isAuth, updateMember);

router.delete('/:id', isAuth, deleteSingleMember);

module.exports = router;
