const express = require('express');

const router = express.Router();

const { isAuth, validateUserCommentCreatorOrAdmin } = require('../middlewares');

const { createNewComment, updateSingleComment, deleteSingleComment } = require('../controllers/comments');

const { validateFields } = require('../validators/validateComment');

router.post('/', isAuth, validateFields, createNewComment);
router.delete('/:id', isAuth, deleteSingleComment);

router.put('/:id', isAuth, validateUserCommentCreatorOrAdmin, updateSingleComment);

module.exports = router;
