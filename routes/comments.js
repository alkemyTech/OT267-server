const express = require('express');

const router = express.Router();

const { isAuth } = require('../middlewares');

const { createNewComment } = require('../controllers/comments');
const { deleteSingleComment } = require('../controllers/comments');
const { validateFields } = require('../validators/validateComment');

router.post('/', isAuth, validateFields, createNewComment);
router.delete('/:id', isAuth, deleteSingleComment);

module.exports = router;
