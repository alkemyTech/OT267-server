const express = require('express');

const router = express.Router();

const { isAuth, validateUserCommentCreatorOrAdmin } = require('../middlewares');

const { createNewComment, updateSingleComment } = require('../controllers/comments');

const { validateFields } = require('../validators/validateComment');

router.post('/', isAuth, validateFields, createNewComment);

router.put('/:id', isAuth, validateUserCommentCreatorOrAdmin, updateSingleComment);

module.exports = router;
