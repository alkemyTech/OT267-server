const {
  success,
  error,
  serverError,
  paginator,
} = require('../helpers');

const { findOneDonation, createDonation, createSubscription } = require('../services/donation');
const { Donation } = require('../models');

const getDonations = async (req, res) => {
  try {
    const allDonations = await paginator(req, Donation);
    return success({
      res,
      message: 'list of all donations',
      data: allDonations,
    });
  } catch (err) {
    return serverError({
      res,
      message: err.message,
    });
  }
};

const getSingleDonation = async (req, res) => {
  try {
    const { id } = req.params;
    const donation = await findOneDonation(id);
    return !donation.message
      ? success({
        res,
        message: 'donation detail',
        data: donation,
      })
      : error({
        res,
        message: donation.message,
        status: donation.status,
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
    const donation = await createDonation(+req.body.amount);
    return success({ res, message: 'single donation link', data: donation });
  } catch (err) {
    return serverError({ res, message: err.message || 'failed to create donation' });
  }
};

const createSubscriptionLink = async (req, res) => {
  try {
    const subscription = await createSubscription(req.body.amount);
    return success({ res, message: 'recurrent donation link', data: subscription });
  } catch (err) {
    return serverError({ res, message: err.message || 'failed to create donation' });
  }
};

const saveDonationData = async (req, res) => {
  const donationData = req.body;
  console.log('req en save', req);
  try {
    // aqui se debe implementar la perseverancia de datos
    return success({
      res, message: 'donation data saved', data: donationData, status: 201,
    });
  } catch (err) {
    return serverError({ res, message: err.message });
  }
};

module.exports = {
  getDonations,
  getSingleDonation,
  createDonationLink,
  createSubscriptionLink,
  saveDonationData,
};
