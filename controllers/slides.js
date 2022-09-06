const { success, serverError, error } = require('../helpers/requestResponses');
const {
  getSlides,
  getASlide,
  updateSlideByPk,
  deleteSlideByPk,
} = require('../services/slide');

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

const updateSlide = async (req, res) => {
  try {
    const { id } = req.params;
    const [response] = await updateSlideByPk(id, req.body);

    return response ? success({
      res,
      message: 'Slide updated successfully',
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
  getSlideDetail,
  updateSlide,
  deleteSlide,
};