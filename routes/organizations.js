const express = require('express');

const router = express.Router();

const { isAdmin, isAuth, uploadFile } = require('../middlewares');
const { getOrgPublicData, updateOrgData } = require('../controllers/organizations');
const { validateOrganization } = require('../validators/validateOrganization');

router.get('/public', getOrgPublicData);

router.post('/public', isAuth, isAdmin, validateOrganization, uploadFile, updateOrgData);

module.exports = router;
