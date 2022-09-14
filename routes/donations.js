const express = require('express');

const router = express.Router();

const { isAuth } = require('../middlewares');

const { createDonationLink, createSubscriptionLink } = require('../controllers/donations');

router.post('/singledonation', isAuth, createDonationLink);

router.post('/subscription', isAuth, createSubscriptionLink);

module.exports = router;
