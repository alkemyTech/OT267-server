const express = require('express');

const router = express.Router();

const { isAuth, isAdmin, validateUserCommentCreatorOrAdmin } = require('../middlewares');

const {
  getComments,
  createComment,
  updateComment,
  deleteComment,
} = require('../controllers/comments');

const { validateFields } = require('../validators/validateComment');

router.get('/', isAuth, isAdmin, getComments);

router.post('/', isAuth, validateFields, createComment);

router.delete('/:id', isAuth, validateUserCommentCreatorOrAdmin, deleteComment);

router.put('/:id', isAuth, validateUserCommentCreatorOrAdmin, updateComment);

module.exports = router;
