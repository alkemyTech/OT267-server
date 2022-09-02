const { success, error, serverError } = require('../helpers/requestResponses');
const { getSlides, deleteSlideByPk } = require('../services/slide');

const getAllSlides = async (req, res) => {
  try {
    const data = await getSlides();
    success({ res, message: 'list of all slides', data });
  } catch (err) {
    serverError({ res, message: err.message });
  }
};

const deleteSlide = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await deleteSlideByPk(id);

    return response ? success({
      res,
      message: 'Slide deleted successfully',
    }) : error({
      res,
      message: 'Slide not found',
    });
  } catch (err) {
    return serverError({
      res,
      message: err.message,
    });
  }
};

module.exports = {
  getAllSlides,
  deleteSlide,
};
