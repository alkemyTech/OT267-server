const sgMail = require('@sendgrid/mail');

const config = require('../config/config');

sgMail.setApiKey(config.development.sgApiKey);

const { htmlTemplate } = require('../templates/welcomeMessage');

const sendMail = async (email) => {
  const msg = {
    to: email,
    from: 'ong267mailer@gmail.com',
    subject: 'Bienvenido! - Somos Más',
    html: `<div>${htmlTemplate}</div>`,
  };

  try {
    await sgMail.send(msg);
    return true;
  } catch (err) {
    return false;
  }
};

module.exports = {
  sendMail,
};
