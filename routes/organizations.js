const express = require('express');

const router = express.Router();

const { getOrgPublicData, updateOrgData } = require('../controllers/organizations');

const { isAuth } = require('../middlewares/isAuth');

const { isAdmin } = require('../middlewares/isAdmin');

const { validateOrganization } = require('../validators/validateOrganization');

const { uploadFile } = require('../middlewares/uploadFile');

router.get('/public', getOrgPublicData);

router.post('/public', isAuth, isAdmin, validateOrganization, uploadFile, updateOrgData);

module.exports = router;
