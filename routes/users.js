const express = require('express');

const router = express.Router();

const { getAllUsers, deleteSingleUser, updateUser } = require('../controllers/users');

const { isAuth } = require('../middlewares/isAuth');

const { isAdmin } = require('../middlewares/isAdmin');

const { isCurrentUser } = require('../middlewares/ownership');

const { validateFields } = require('../validators/validateUser');

const { uploadFile } = require('../middlewares/uploadFile');

router.get('/', isAuth, isAdmin, getAllUsers);

router.delete('/:id', isAuth, isCurrentUser, deleteSingleUser);

router.patch('/:id', isAuth, isCurrentUser, validateFields, uploadFile, updateUser);

module.exports = router;
