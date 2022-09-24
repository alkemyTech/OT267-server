const { success, error, serverError } = require('../helpers');

const { Testimony } = require('../models');

const {
  findOrCreateTestimony,
  updateByIdTestimony,
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
        attributes: {
          exclude: ['deletedAt'],
        },
      },
    );
  } catch (err) {
    return serverError({ res, message: err.message });
  }
  if (data) return success({ res, message: 'list of all testimonies', data });

  return error({ res, message: 'testimonies not found' });
};

const createTestimony = async (req, res) => {
  if (Object.keys(req.body).length < 1) error({ res, message: 'data is required' });

  try {
    const newTestimony = await findOrCreateTestimony(req.body);

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
  if (Object.keys(req.body).length < 1) return error({ res, message: 'data is required' });

  const { id } = req.params;
  const data = req.body;

  try {
    const testimonyUpdated = await updateByIdTestimony(id, data);
    if (testimonyUpdated === null) return error({ res, message: 'testimony not found' });
    return success({
      res, message: 'testimony updated', status: 201,
    });
  } catch (err) {
    return serverError({ res, message: err.message });
  }
};

const deleteTestimony = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await destroyTestimony(id);
    if (response === 0) error({ res, message: 'testimony not found' });
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
