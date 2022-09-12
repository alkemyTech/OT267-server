const express = require('express');

const router = express.Router();

const { isAuth, isAdmin, validateUserCommentCreatorOrAdmin } = require('../middlewares');

const { getAllComments, createNewComment, updateSingleComment } = require('../controllers/comments');

const { validateFields } = require('../validators/validateComment');

router.get('/', isAuth, isAdmin, getAllComments);

router.post('/', isAuth, validateFields, createNewComment);

router.put('/:id', isAuth, validateUserCommentCreatorOrAdmin, updateSingleComment);

module.exports = router;
