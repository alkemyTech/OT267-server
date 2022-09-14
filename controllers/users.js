const { findAllUsers, destroyUser, updateByIdUser } = require('../services/user');

const { success, error, serverError } = require('../helpers');

const getUsers = async (req, res) => {
  try {
    const data = await findAllUsers();

    if (data) success({ res, message: 'list of all users', data });
    else error({ res, message: 'users not found' });
  } catch (err) {
    serverError({ res, message: err.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await destroyUser(id);

    if (data === 0) {
      return error({ res, message: 'user not found' });
    }
  } catch (err) {
    serverError({ res, message: err.message });
  }
  return success({ res, message: 'user deleted' });
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await updateByIdUser(id, req.body);
    return response
      ? success({ res, message: 'user updated', status: 201 })
      : error({ res, message: 'user not found' });
  } catch (err) {
    return serverError({ res, message: err.message });
  }
};

module.exports = {
  deleteUser,
  getUsers,
  updateUser,
};
