const express = require('express');

const router = express.Router();

const { isAdmin, isAuth, uploadFile } = require('../middlewares');
const { validateActivity } = require('../validators/validateActivity');
const { getAllActivities, createNewActivity, updateSingleActivity } = require('../controllers/activities');

router.get('/', isAuth, isAdmin, getAllActivities);

router.post('/', isAuth, isAdmin, validateActivity, uploadFile, createNewActivity);

router.put('/:id', isAuth, isAdmin, uploadFile, updateSingleActivity);

module.exports = router;
