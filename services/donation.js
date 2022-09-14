const axios = require('axios');
const config = require('../config/config');

const createDonation = async (amount) => {
  const url = `${config.development.mpUrl}checkout/preferences`;

  const body = {
    items: [
      {
        id: '1',
        title: 'Donación única',
        description: 'Donación única para la ONG Somos Más',
        /* picture_url: 'https://drive.google.com/file/d/1-j70Zmn2B1-0T_67JHJbNLKkI9sACMNi/view?usp=sharing', */
        category_id: 'single donation',
        quantity: 1,
        unit_price: amount,
      },
    ],
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

module.exports = { createDonation, createSubscription };
