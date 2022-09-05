const { success, serverError, error } = require('../helpers/requestResponses');
const { getSlides, getASlide } = require('../services/slide');

const getAllSlides = async (req, res) => {
  try {
    const data = await getSlides();
    success({ res, message: 'list of all slides', data });
  } catch (err) {
    serverError({ res, message: err.message });
  }
};

const getSlideDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await getASlide(id);
    if (!data) return error({ res, message: 'slide not found' });
    return success({ res, message: 'slide detail', data });
  } catch (err) {
    return serverError({ res, message: err.message });
  }
};

module.exports = { getAllSlides, getSlideDetail };
