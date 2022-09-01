const { createUser } = require('../services/contact');
const { success, serverError } = require('../helpers/requestResponses');

const create = async (req, res) => {
  try {
    const { body } = req;
    const newContact = await createUser(body);
    if (!newContact) throw Error('Contacto no creado, por favor intente más tarde');
    success({
      res,
      message: 'Contacto registrado con éxito',
      data: newContact,
      status: 201,
    });
  } catch (err) {
    serverError({
      res,
      message: err.message,
      status: 500,
    });
  }
};

module.exports = {
  create,
};
