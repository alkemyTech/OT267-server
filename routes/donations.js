const express = require('express');

const router = express.Router();

const { isAuth } = require('../middlewares');

const { getDonationLink, getSubscriptionLink } = require('../controllers/donations');

router.post('/singledonation', isAuth, getDonationLink);

router.post('/subscription', isAuth, getSubscriptionLink);

module.exports = router;
