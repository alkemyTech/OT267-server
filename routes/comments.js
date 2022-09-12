const express = require('express');

const router = express.Router();

const { isAuth } = require('../middlewares');

const { createNewComment } = require('../controllers/comments');

const { validateFields } = require('../validators/validateComment');

router.post('/', isAuth, validateFields, createNewComment);

module.exports = router;
