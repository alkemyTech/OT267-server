/* eslint-disable no-unused-vars */
/* eslint-disable no-return-await */
const { success, error, serverError } = require('../helpers/requestResponses');

const getAllTestimonials = async (req, res) => { success({ res, message: 'all testimonials' }); };
const { createTestimony } = require('../services/testimony');

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

module.exports = { getAllTestimonials, createATestimony };

// ESLINT TEMPORAL
