/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const { allUsers, deleteUser } = require('../services/user');

const getAllUsers = async (req, res) => {
  try {
    const data = await allUsers();

    if (data) res.status(200).json({ message: 'All users', data });
    else res.status(404).json({message: 'Users not found'});
    
  } catch (error) {
    res.status(500).json({message: 'Error: Something went wrong, please try again later.'})
  }
};

const deleteSingleUser = async (_req, res, next) => {
  const { id } = _req.params;
  try {
    const data = await deleteUser(id);

    if (data === 0) {
      return res.status(404).json({
        message: 'user does not exist',
      });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }

  return res.status(200).json({
    message: 'user deleted',
  });
};

module.exports = { getAllUsers, deleteSingleUser };
