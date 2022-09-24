const { sendMail, success, serverError } = require('../helpers');
const {
  newContact,
  findAllContacts,
} = require('../services/contact');

const createContact = async (req, res) => {
  try {
    const { body } = req;
    const contact = await newContact(body);
    if (!contact) throw Error('Something went wrong during the contact creation, try again later');
    success({
      res,
      message: 'contact registered succesfully',
      data: contact,
      status: 201,
    });
    // Send mail when registred new contact.
    sendMail(
      body.email,
      'Gracias por contactar con Somas Más ONG',
      'Sus datos de contacto han sido registrado con éxito.',
    );
  } catch (err) {
    serverError({
      res,
      message: err.message,
      status: 500,
    });
  }
};

const getContacts = async (req, res) => {
  try {
    const data = await findAllContacts();

    success({ res, message: 'list of all contacts', data, status: 200 });
  } catch (err) {
    serverError({ res, message: err.message });
  }
};

module.exports = { createContact, getContacts };
