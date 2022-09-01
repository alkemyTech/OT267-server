const { success, serverError } = require('../helpers/requestResponses');
const { getSlides } = require('../services/slide');

const getAllSlides = async (req, res) => {
  try {
    const data = await getSlides();
    success({ res, message: 'list of all slides', data });
  } catch (err) {
    serverError({ res, message: err.message });
  }
};

module.exports = { getAllSlides };
