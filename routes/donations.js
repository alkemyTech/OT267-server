const express = require('express');

const router = express.Router();

const { isAuth, isAdmin } = require('../middlewares');

const {
  getAllDonations,
  getDonationLink,
  getSubscriptionLink,
  saveDonationData,
} = require('../controllers/donations');

router.get('/', isAuth, isAdmin, getAllDonations);

router.post('/singledonation', isAuth, getDonationLink);

router.post('/subscription', isAuth, getSubscriptionLink);

router.post('/notification', async (req, res, next) => {
  res.status(200);
  next();
}, saveDonationData);

module.exports = router;
