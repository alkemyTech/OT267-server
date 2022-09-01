const { success, error, serverError } = require('../helpers/requestResponses');
const { getSlides } = require('../services/slide');

const getAllSlides = async (req, res) => {
  try {
    const data = await getSlides();

    if (data) success({ res, message: 'list of all slides', data });
    else error({ res, message: 'slides not found' });
  } catch (err) {
    serverError({ res, message: err.message });
  }
};

module.exports = { getAllSlides };
