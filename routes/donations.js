const express = require('express');

const router = express.Router();

const { isAuth, isAdmin } = require('../middlewares');

const {
  getDonations,
  getSingleDonation,
  createDonationLink,
  createSubscriptionLink,
  saveDonation,
} = require('../controllers/donations');

router.get('/', isAuth, isAdmin, getDonations);

router.get('/:id', isAuth, isAdmin, getSingleDonation);

router.post('/singledonation', isAuth, createDonationLink);

router.post('/subscription', isAuth, createSubscriptionLink);

router.post('/notification', async (req, res, next) => {
  res.status(200);
  next();
}, saveDonation);

module.exports = router;
