const { success, serverError } = require('../helpers/requestResponses');
const { getContacts, createNewContact } = require('../services/contact');
const { sendMail } = require('../helpers/sendMail');

const getAllContacts = async (req, res) => {
  try {
    const data = await getContacts();

    success({ res, message: 'list of all contacts', data });
  } catch (err) {
    serverError({ res, message: err.message });
  }
};

const createContact = async (req, res) => {
  try {
    const { body } = req;
    const newContact = await createNewContact(body);
    if (!newContact) throw Error('Something went wrong during the contact creation, try again later');
    success({
      res,
      message: 'contact registered succesfully',
      data: newContact,
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

module.exports = { getAllContacts, createContact };
