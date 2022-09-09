const express = require('express');

const router = express.Router();

const { isAuth, isAdmin } = require('../middlewares');

const { getAllComments, createNewComment } = require('../controllers/comments');

const { validateFields } = require('../validators/validateComment');

router.get('/', isAuth, isAdmin, getAllComments);

router.post('/', isAuth, validateFields, createNewComment);

module.exports = router;
