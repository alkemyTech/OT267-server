const { Contact } = require('../models');
/**
 * Create a new contact in the database.
 * @param {Object} param0 Object with the data.
 * @returns the information about the new contact create in the database.
 */
// eslint-disable-next-line object-curly-newline
const newContact = async ({ name, phone, email, message }) => {
  const contact = await Contact.create({
    name,
    phone,
    email,
    message,
  });
  return contact;
};

const findAllContacts = async () => Contact.findAll({
  attributes: [
    'id',
    'name',
    'phone',
    'email',
    'message',
  ],
});

module.exports = {
  newContact,
  findAllContacts,
};
