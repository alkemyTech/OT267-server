const { success, serverError, paginator } = require('../helpers');

const { createDonation, createSubscription } = require('../services/donation');
const { Donation } = require('../models');

const getDonations = async (req, res) => {
  try {
    const allDonations = await paginator(req, Donation);
    return success({
      res,
      message: 'All donations',
      data: allDonations,
    });
  } catch (err) {
    return serverError({
      res,
      message: err.message,
    });
  }
};

const createDonationLink = async (req, res) => {
  try {
    const donation = await createDonation(req.body.amount);
    return success({ res, message: 'single donation link', data: donation });
  } catch (err) {
    return serverError({ res, message: err.message || 'Failed to create donation' });
  }
};

const createSubscriptionLink = async (req, res) => {
  try {
    const subscription = await createSubscription(req.body.amount);
    return success({ res, message: 'recurrent donation link', data: subscription });
  } catch (err) {
    return serverError({ res, message: err.message || 'Failed to create donation' });
  }
};

const saveDonationData = async (req, res) => {
  const donationData = req.body;
  try {
    // aqui se debe implementar la perseverancia de datos
    return success({ res, message: 'donation data saved', data: donationData });
  } catch (err) {
    return serverError({ res, message: err.message });
  }
};

module.exports = {
  getDonations,
  createDonationLink,
  createSubscriptionLink,
  saveDonationData,
};