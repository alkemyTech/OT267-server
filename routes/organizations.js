const express = require('express');

const router = express.Router();

const { isAdmin, isAuth, uploadFile } = require('../middlewares');
const {
  getAllOrgData,
  updateOrgData,
} = require('../controllers/organizations');
const { validateOrganization } = require('../validators/validateOrganization');

router.get('/public', getAllOrgData);

router.post(
  '/public',
  isAuth,
  isAdmin,
  validateOrganization,
  uploadFile,
  updateOrgData,
);

module.exports = router;
