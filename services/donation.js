const axios = require('axios');

const config = require('../config/config');

const { Donation } = require('../models/index');

const findOneDonation = async (id) => {
  try {
    const donation = await axios.get(`https://api.mercadopago.com/v1/payments/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.development.mpAccessToken}`,
      },
    }).then((r) => r.data);

    return donation;
  } catch (err) {
    return err;
  }
};

const createDonation = async (amount) => {
  const url = `${config.development.mpUrl}checkout/preferences`;

  const body = {
    items: [
      {
        id: '1',
        title: 'Donación única',
        description: 'Donación única para la ONG Somos Más',
        /* picture_url: */
        category_id: 'single donation',
        quantity: 1,
        unit_price: amount,
      },
    ],
    /*     back_urls: {
      failure:,
      pending:,
      success:,
    },
    auto_return: 'approved', */
    payment_methods: {
      installments: 1,
    },
    notification_url: `${config.development.ngrokServerUrl}/donations/notification`,
    statement_descriptor: 'Somos Más ONG',
    external_reference: 'smong267',
  };

  const donation = await axios.post(url, body, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.development.mpAccessToken}`,
    },
  });

  return donation.data;
};

const saveDonationData = async (donation) => Donation
  .findOne(donation.data_id)
  .then((obj) => {
    if (obj) return obj.update(donation);
    return Donation.create(donation);
  });

const createSubscription = async (amount) => {
  const url = `${config.development.mpUrl}preapproval`;

  const body = {
    reason: 'Donación mensual',
    auto_recurring: {
      frequency: 1,
      frequency_type: 'months',
      transaction_amount: amount,
      currency_id: 'ARS',
    },
    payer_email: 'test_user_82921974@testuser.com',
    back_url: 'https://es.wikipedia.org/wiki/%C3%89xito',
  };

  const subscription = await axios.post(url, body, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.development.mpAccessToken}`,
    },
  });

  return subscription.data;
};

module.exports = {
  findOneDonation, createDonation, createSubscription, saveDonationData,
};
