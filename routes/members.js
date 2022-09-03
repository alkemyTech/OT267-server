const express = require('express');

const router = express.Router();

const { membersList, removeMember } = require('../controllers/members');

const { isAdmin } = require('../middlewares/isAdmin');

const { isAuth } = require('../middlewares/isAuth');

router.get('/', isAuth, isAdmin, membersList);

router.delete('/:id', isAuth, isAdmin, removeMember);

module.exports = router;
