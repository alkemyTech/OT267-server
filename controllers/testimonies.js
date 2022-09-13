const { success, error, serverError } = require('../helpers');
const { Testimony } = require('../models/index');
const {
  createTestimony,
  findTestimony,
  updateTestimonyByPk,
  destroyTestimony,
} = require('../services/testimony');
const { paginator } = require('../helpers/paginator');

const getAllTestimonies = async (req, res) => {
  try {
    const data = await paginator(req, Testimony);

    if (data) success({ res, message: 'list of all testimonies', data });
    else error({ res, message: 'testimonies not found' });
  } catch (err) {
    serverError({ res, message: err.message });
  }
};

const createNewTestimony = async (req, res) => {
  const { name, content } = req.body;

  try {
    const newTestimony = await createTestimony(name, content);

    if (!newTestimony) return error({ res, message: 'testimony already exists', status: 400 });

    return success({
      res,
      message: 'testimony created',
      status: 201,
      data: newTestimony,
    });
  } catch (err) {
    return serverError({ res, message: err.message });
  }
};

const updateSingleTestimony = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    await updateTestimonyByPk(id, data);

    const testimonyUpdated = await findTestimony(id);

    return success({
      res, message: 'Testimony updated', data: testimonyUpdated, status: 201,
    });
  } catch (err) {
    return serverError({ res, message: err.message });
  }
};

const deleteSingleTestimony = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await destroyTestimony(id);
    if (response === 0) error({ res, message: 'Testimony not found' });
    else success({ res, message: 'testimony deleted' });
  } catch (err) {
    serverError({ res, message: err.message });
  }
};

module.exports = {
  getAllTestimonies,
  createNewTestimony,
  updateSingleTestimony,
  deleteSingleTestimony,
};
