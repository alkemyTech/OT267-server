/* eslint-disable no-unused-vars */

const express = require('express');
const { updateActivity } = require('../controllers/activity');
const { isAdmin } = require('../middlewares/isAdmin');
const { isAuth } = require('../middlewares/isAuth');

const router = express.Router();

const { validateActivity } = require('../middlewares/validateActivity');

const { getAllActivities, createActivity } = require('../controllers/activities');

const { isAdmin } = require('../middlewares/isAdmin');
const { isAuth } = require('../middlewares/isAuth');

router.get('/', isAuth, isAdmin, getAllActivities);

router.post('/', isAuth, isAdmin, validateActivity, createActivity);

router.put('/:id', isAuth, isAdmin, updateActivity);

module.exports = router;
