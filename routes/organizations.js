/* eslint-disable no-unused-vars */
const express = require('express');

const router = express.Router();
const { getAllOrg, editOrgData } = require('../controllers/organizations');

/* GET organizations listing. */
router.get('/public', getAllOrg);
router.put("/public", editOrgData)

module.exports = router;
