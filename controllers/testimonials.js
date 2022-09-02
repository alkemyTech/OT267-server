/* eslint-disable no-unused-vars */
/* eslint-disable no-return-await */
const { success, error, serverError } = require('../helpers/requestResponses');

const { allTestimonies, createTestimony, destroyTestimony } = require('../services/testimony');

const getAllTestimonials = async (req, res) => {
  try {
    const data = await allTestimonies();

    if (data) success({ res, message: 'list of all testimonies', data });
    else error({ res, message: 'tesmimonies not found' });
  } catch (err) {
    serverError({ res, message: err.message });
  }
};

const createATestimony = async (req, res) => {
  const { name, content } = req.body;

  try {
    const newTestimony = await createTestimony(name, content);

    if (!newTestimony) return error({ res, message: 'Testimony already exists', status: 400 });

    return success({
      res, message: 'Testimony created', status: 201, data: newTestimony,
    });
  } catch (err) {
    return serverError({ res, message: err.message });
  }
};

const deleteTestimony = async (req, res) => {
  const { id } = req.params;
  try {
    await destroyTestimony(id);
    return success({ res, message: 'testimony deleted' });
  } catch (err) {
    serverError({ res, message: err.message });
  }
};

module.exports = { getAllTestimonials, createATestimony, deleteTestimony };

// ESLINT TEMPORAL
