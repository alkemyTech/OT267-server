/* eslint-disable no-unused-vars */
const express = require('express');

const router = express.Router();
const { getAllOrg, editOrgData } = require('../controllers/organization');
const { isAuth } = require('../middlewares/isAuth');
const { isAdmin } = require('../middlewares/isAdmin');
const { validateOrganization } = require('../validators/validateOrganization');

/* GET organizations listing. */
router.get('/public', getAllOrg);
router.post('/public', [isAuth, isAdmin, validateOrganization], editOrgData);

module.exports = router;
