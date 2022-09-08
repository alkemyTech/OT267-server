const express = require('express');

const router = express.Router();

const { createNewMember, getAllMembers, deleteSingleMember } = require('../controllers/members');

const { isAdmin } = require('../middlewares/isAdmin');

const { isAuth } = require('../middlewares/isAuth');

const { validateCreateMembers } = require('../validators/validateMembers');

router.get('/', isAuth, isAdmin, getAllMembers);
router.post('/', [isAuth, validateCreateMembers], createNewMember);

router.delete('/:id', isAuth, deleteSingleMember);

module.exports = router;
