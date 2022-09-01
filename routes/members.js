const express = require('express');
const router = express.Router();

const { membersList } = require('../controllers/members');  

const { isAdmin } = require('../middlewares/isAdmin');

const { isAuth } = require('../middlewares/isAuth');

router.get('/', isAuth, isAdmin, membersList);

module.exports = router;
