const express = require('express');

const router = express.Router();

const { isAdmin, isAuth, uploadFile } = require('../middlewares');

const {
  getOrganization,
  updateOrganization,
} = require('../controllers/organizations');

const { validateOrganization } = require('../validators/validateOrganization');

router.get('/public', getOrganization);

router.post(
  '/public',
  isAuth,
  isAdmin,
  validateOrganization,
  uploadFile,
  updateOrganization,
);

module.exports = router;
