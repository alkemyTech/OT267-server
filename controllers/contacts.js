const { success, serverError } = require('../helpers/requestResponses');
const { getContacts } = require('../services/contact');

const getAllContacts = async (req, res) => {
  try {
    const data = await getContacts();

    success({ res, message: 'list of all contacts', data });
  } catch (err) {
    serverError({ res, message: err.message });
  }
};

module.exports = { getAllContacts };
