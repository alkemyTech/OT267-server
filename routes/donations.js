const express = require('express');

const router = express.Router();

const { isAuth } = require('../middlewares');

const { createDonationLink, createSubscriptionLink, saveDonationData } = require('../controllers/donations');

router.post('/singledonation', isAuth, createDonationLink);

router.post('/subscription', isAuth, createSubscriptionLink);

router.post('/notification', async (req, res, next) => {
  res.status(200);
  next();
}, saveDonationData);

module.exports = router;
