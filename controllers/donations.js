const {
  findOneDonation, createDonation, createSubscription, saveDonationData,
} = require('../services/donation');

const {
  success,
  error,
  serverError,
  paginator,
} = require('../helpers');

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

const getSingleDonation = async (req, res) => {
  try {
    const { id } = req.params;
    const donation = await findOneDonation(id);
    return !donation.message
      ? success({
        res,
        message: 'Donation detail',
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

const saveDonation = async (req, res) => {
  try {
    const donationData = await saveDonationData(req.body);

    if (!donationData) return error({ res, message: 'Payment details were not saved, try again' });
    // aqui se debe implementar la perseverancia de datos
    return success({ res, message: 'donation data saved', data: donationData });
  } catch (err) {
    return serverError({ res, message: err.message });
  }
};

module.exports = {
  saveDonation,
  getDonations,
  getSingleDonation,
  createDonationLink,
  createSubscriptionLink,
};
