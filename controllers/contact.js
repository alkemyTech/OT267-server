const { createNewContact } = require('../services/contact');
const { success, serverError } = require('../helpers/requestResponses');
const { sendMail } = require('../helpers/sendMail');

const createContact = async (req, res) => {
  try {
    const { body } = req;
    const newContact = await createNewContact(body);
    if (!newContact) throw Error('Contacto no creado, por favor intente más tarde');
    success({
      res,
      message: 'Contacto registrado con éxito',
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

module.exports = {
  createContact,
};
