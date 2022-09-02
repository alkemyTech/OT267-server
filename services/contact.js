const { Contact } = require('../models');
/**
 * Create a new contact in the database.
 * @param {Object} param0 Object with the data.
 * @returns the information about the new contact create in the database.
 */
// eslint-disable-next-line object-curly-newline
const createNewContact = async ({ name, phone, email, message }) => {
  const newContact = await Contact.create({
    name,
    phone,
    email,
    message,
  });
  return newContact;
};

module.exports = {
  createNewContact,
};
