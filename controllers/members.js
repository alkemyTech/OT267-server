const { success, error, serverError } = require('../helpers');

const { paginator } = require('../helpers/paginator');

const { Member } = require('../models/index');

const {
  findOrCreateMember,
  destroyMember,
  updateByIdMember,
} = require('../services/members');

const createMember = async (req, res) => {
  if (Object.keys(req.body).length < 1) error({ res, message: 'data is required' });

  try {
    const newMember = await findOrCreateMember(req.body);
    if (!newMember) return error({ res, message: 'member already exists', status: 400 });
    return success({
      res, message: 'member created', data: newMember, status: 201,
    });
  } catch (err) {
    return serverError({ res, message: err.message });
  }
};

const getMembers = async (req, res) => {
  try {
    const data = await paginator(req, Member, {
      attributes: {
        exclude: ['deletedAt'],
      },
    });

    if (data.length === 0) return error({ res, message: 'members not found' });

    return success({ res, message: 'list of all members', data });
  } catch (err) {
    return serverError({ res, message: err.message });
  }
};

const deleteMember = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await destroyMember(id);

    if (response === 0) return error({ res, message: 'member not found' });
  } catch (err) {
    serverError({ res, message: err.message });
  }

  return success({ res, message: 'member deleted' });
};

const updateMember = async (req, res) => {
  if (Object.keys(req.body).length < 1) error({ res, message: 'data is required' });
  const { id } = req.params;
  try {
    const [data] = await updateByIdMember(id, req.body);
    return data
      ? success({ res, status: 201, message: 'member updated' })
      : error({ res, message: 'member not found' });
  } catch (err) {
    return serverError({ res, message: err.message });
  }
};

module.exports = {
  createMember,
  getMembers,
  deleteMember,
  updateMember,
};
