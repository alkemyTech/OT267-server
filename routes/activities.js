/* eslint-disable no-unused-vars */
// Default imports
const { query } = require('express');
const express = require('express');
const { updateActivity } = require('../controllers/activities');

const router = express.Router();

/* GET users listing. */
router.get('/', async (req, res, next) => {
  res.send('respond with a resource');
});

router.put('/:id', updateActivity);

module.exports = router;
