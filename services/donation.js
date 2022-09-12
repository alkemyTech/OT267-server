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
    payer: {
      name: 'Mirtha',
      surname: 'Martinez',
      /* userId from token to find email?? */
      /*       email: 'test_user_82921974@testuser.com', */
      phone: {
        area_code: '11',
        number: '22223333',
      },
      identification: {
        type: 'DNI',
        number: '01111111',
      },
      address: {
        street_name: 'Calle',
        street_number: 123,
        zip_code: '1111',
      },
    },
    /*     back_urls: {
      failure: 'http://localhost:3000/failure',
      pending: 'http://localhost:3000/pending',
      success: 'http://localhost:3000/success',
    },
    auto_return: 'approved', */
    payment_methods: {
      installments: 1,
    },
    /*       notification_url: 'http://localhost:3000/donations/notifications', */
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
    /* auto_return: 'approved', */
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
