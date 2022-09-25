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

const saveDonationData = async (req, res) => {
  const { body } = req;

  console.log(body);

  if (body.topic) return res.status(200).send('OK');

  try {
    const donationData = await saveDonation(body);

    console.log('llegue');
    console.log(donationData);

    if (!donationData) return error({ res, message: 'Payment details were not saved, try again' });

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
