const express = require('express');

const router = express.Router();

const {
  isAuth,
  isAdmin,
  isCurrentUser,
  uploadFile,
} = require('../middlewares');
const { getAllUsers, deleteSingleUser, updateSingleUser } = require('../controllers/users');
const { validateFields } = require('../validators/validateUser');

router.get('/', isAuth, isAdmin, getAllUsers);

router.delete('/:id', isAuth, isCurrentUser, deleteSingleUser);

router.patch('/:id', isAuth, isCurrentUser, validateFields, uploadFile, updateSingleUser);

module.exports = router;
