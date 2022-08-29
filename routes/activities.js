/* eslint-disable no-unused-vars */
// Default imports
const { query } = require('express');
const express = require('express');
const { updateActivity } = require('../controllers/activity');
const { isAdmin } = require('../middlewares/isAdmin');
const { isAuth } = require('../middlewares/isAuth');

const router = express.Router();

/* GET users listing. */
router.get('/', async (req, res, next) => {
  res.send('respond with a resource');
});

router.put('/:id', isAuth, isAdmin, updateActivity);

module.exports = router;
