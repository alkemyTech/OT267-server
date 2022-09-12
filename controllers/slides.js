const fs = require('fs');
const { success, serverError, error } = require('../helpers/requestResponses');
const {
  createASlide,
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

const updateSingleSlide = async (req, res) => {
  try {
    const { id } = req.params;
    const [response] = await updateSlideByPk(id, req.body);

    return response ? success({
      res,
      message: 'slide updated successfully',
    }) : error({
      res,
      message: 'slide not found',
    });
  } catch (err) {
    return serverError({
      res,
      message: err.message,
    });
  }
};

const deleteSingleSlide = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await deleteSlideByPk(id);

    return response ? success({
      res,
      message: 'slide deleted successfully',
    }) : error({
      res,
      message: 'slide not found',
    });
  } catch (err) {
    return serverError({
      res,
      message: err.message,
    });
  }
};

const createSlide = async (req, res) => {
  const { body } = req;

  try {
    try {
      fs.unlinkSync(body.filePath);
    } catch (err) {
      return serverError({ res, message: err.message });
    }
    if (!body.order) {
      const array = await getSlides();
      body.order = (array[array.length - 1].order) + 1;
    }

    const newSlide = await createASlide(body);

    return success({
      res, message: 'slide created succesfully', status: 201, data: newSlide,
    });
  } catch (err) {
    return serverError({
      res,
      message: err.message,
    });
  }
};

module.exports = {
  createSlide,
  getAllSlides,
  getSlideDetail,
  updateSingleSlide,
  deleteSingleSlide,
};
