/* eslint-disable no-unused-vars */

const { allUsers, deleteUser } = require('../services/user');


const getAllUsers = async (req, res) => {
  try {
    const data = await allUsers();

    if (data) {
      res.status(200).json({ message: 'all users', data });
    } else {
      res.status(400).send('users not found');
    }
  } catch (error) {
    console.log(error);
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
