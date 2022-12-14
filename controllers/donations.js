const {
  success,
  error,
  serverError,
  paginator,
} = require('../helpers');

const {
  findOneDonation, createDonation, createSubscription, saveDonation,
} = require('../services/donation');
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
    const donation = await findOneDonation(req.params.id);

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
  const { body } = req;

  if (body.topic) return res.status(200).send('OK');

  try {
    const donationData = await saveDonation(body);

    if (!donationData) return error({ res, message: 'payment details were not saved, try again' });

    return res.status(200).send('OK');
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
