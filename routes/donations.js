const express = require('express');

const router = express.Router();

const { isAuth } = require('../middlewares');

const { getDonationLink, getSubscriptionLink, saveDonation } = require('../controllers/donations');

router.post('/singledonation', isAuth, createDonationLink);

router.post('/subscription', isAuth, createSubscriptionLink);

router.post('/notification', async (req, res, next) => {
  res.status(200);
  next();
}, saveDonation);

module.exports = router;
