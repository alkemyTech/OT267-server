const Contact = require('../models/index');

const getContacts = async () => Contact.findAll({
  attributes: [
    'id',
    'name',
    'phone',
    'email',
    'message',
  ],
});

module.exports = { getContacts };
