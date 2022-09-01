const express = require('express');

const router = express.Router();

const { getOrg, editOrgData } = require('../controllers/organizations');

const { isAuth } = require('../middlewares/isAuth');

const { isAdmin } = require('../middlewares/isAdmin');

const { validateOrganization } = require('../validators/validateOrganization');

const { uploadFile } = require('../middlewares/uploadFile');

router.get('/public', getOrg);

router.post('/public', isAuth, isAdmin, validateOrganization, uploadFile, editOrgData);

module.exports = router;
