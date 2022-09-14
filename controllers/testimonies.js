const { success, error, serverError } = require('../helpers');

const { Testimony } = require('../models');

const {
  findOrCreateTestimony,
  updateByIdTestimony,
  findByPkTestimony,
  destroyTestimony,
} = require('../services/testimony');

const { paginator } = require('../helpers/paginator');

const getTestimonies = async (req, res) => {
  let data = {};
  try {
    data = await paginator(
      req,
      Testimony,
      {
        attributes: [
          'id',
          'name',
          'image',
          'content',
        ],
      },
    );
  } catch (err) {
    return serverError({ res, message: err.message });
  }
  if (data) return success({ res, message: 'list of all testimonies', data });

  return error({ res, message: 'testimonies not found' });
};

const createTestimony = async (req, res) => {
  const { name, content } = req.body;

  try {
    const newTestimony = await findOrCreateTestimony(name, content);

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

const updateTestimony = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    await updateByIdTestimony(id, data);

    const testimonyUpdated = await findByPkTestimony(id);

    return success({
      res, message: 'Testimony updated', data: testimonyUpdated, status: 201,
    });
  } catch (err) {
    return serverError({ res, message: err.message });
  }
};

const deleteTestimony = async (req, res) => {
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
  getTestimonies,
  createTestimony,
  updateTestimony,
  deleteTestimony,
};
