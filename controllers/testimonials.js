/* eslint-disable no-unused-vars */
/* eslint-disable no-return-await */
const { success, error, serverError } = require('../helpers/requestResponses');

const getAllTestimonials = async (req, res) => { success({ res, message: 'all testimonials' }); };

module.exports = { getAllTestimonials };

// ESLINT TEMPORAL
