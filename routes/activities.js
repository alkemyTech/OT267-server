/* eslint-disable no-unused-vars */

const express = require('express');

const router = express.Router();

const { validateActivity } = require('../middlewares/validateActivity');

const { getAllActivities, createActivity } = require('../controllers/activities');

const { isAdmin } = require('../middlewares/isAdmin');
const { isAuth } = require('../middlewares/isAuth');

router.get('/', isAuth, isAdmin, getAllActivities);

router.post('/', isAuth, isAdmin, validateActivity, createActivity);

module.exports = router;
