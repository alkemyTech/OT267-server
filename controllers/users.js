const { allUsers, deleteUser, updatebyPk } = require('../services/user');

const { success, error, serverError } = require('../helpers/requestResponses');

const getAllUsers = async (req, res) => {
  try {
    const data = await allUsers();

    if (data) success({ res, message: 'all users', data });

    else error({ res, message: 'users not found' });
  } catch (err) {
    serverError({ res, message: err.message });
  }
};

const deleteSingleUser = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await deleteUser(id);

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
    const response = await updatebyPk(id, req.body);
    return response
      ? success({ res, message: 'user updated', status: 201 })
      : error({ res, message: 'user not found' });
  } catch (err) {
    return serverError({ res, message: err.message });
  }
};

module.exports = {
  deleteSingleUser,
  getAllUsers,
  updateUser,
};
