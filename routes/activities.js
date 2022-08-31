/* eslint-disable no-unused-vars */

const express = require('express');

const { isAdmin } = require('../middlewares/isAdmin');

const { isAuth } = require('../middlewares/isAuth');

const router = express.Router();

const { validateActivity } = require('../validators/validateActivity');

const { getAllActivities, createActivity, updateActivity } = require('../controllers/activities');

router.get('/', isAuth, isAdmin, getAllActivities);

router.post('/', isAuth, isAdmin, validateActivity, createActivity);

router.put('/:id', isAuth, isAdmin, updateActivity);

module.exports = router;
