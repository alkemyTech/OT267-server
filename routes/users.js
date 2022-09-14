const express = require('express');

const router = express.Router();

const {
  isAuth,
  isAdmin,
  isCurrentUser,
  uploadFile,
} = require('../middlewares');

const {
  deleteUser,
  getUsers,
  updateUser,
} = require('../controllers/users');

const { validateFields } = require('../validators/validateUser');

router.get('/', isAuth, isAdmin, getUsers);

router.delete('/:id', isAuth, isCurrentUser, deleteUser);

router.patch('/:id', isAuth, isCurrentUser, validateFields, uploadFile, updateUser);

module.exports = router;
