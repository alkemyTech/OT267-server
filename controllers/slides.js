const fs = require('fs');
const { success, serverError, error } = require('../helpers/requestResponses');
const {
  newSlide,
  destroySlide,
  updateByIdSlide,
  findOneSlide,
  finAllSlides,
} = require('../services/slide');

const getSlides = async (req, res) => {
  try {
    const data = await finAllSlides();
    success({ res, message: 'list of all slides', data });
  } catch (err) {
    serverError({ res, message: err.message });
  }
};

const getSlide = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await findOneSlide(id);
    if (!data) return error({ res, message: 'slide not found' });
    return success({ res, message: 'slide detail', data });
  } catch (err) {
    return serverError({ res, message: err.message });
  }
};

const updateSlide = async (req, res) => {
  try {
    const { id } = req.params;
    const [response] = await updateByIdSlide(id, req.body);

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

const deleteSlide = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await destroySlide(id);

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

    const slide = await newSlide(body);

    return success({
      res, message: 'slide created succesfully', status: 201, data: slide,
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
  getSlides,
  getSlide,
  updateSlide,
  deleteSlide,
};
