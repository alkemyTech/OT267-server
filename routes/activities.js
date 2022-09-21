const express = require('express');

const router = express.Router();

const { isAdmin, isAuth, uploadFile } = require('../middlewares');
const { validateActivity } = require('../validators/validateActivity');
const { getActivities, createActivity, updateActivity } = require('../controllers/activities');

router.get('/', isAuth, isAdmin, getActivities);

router.post('/', isAuth, isAdmin, validateActivity, uploadFile, createActivity);

router.put('/:id', isAuth, isAdmin, uploadFile, updateActivity);

module.exports = router;
