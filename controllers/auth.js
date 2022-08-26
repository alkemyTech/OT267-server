/* eslint-disable no-console */
const { createUser, findUserById } = require('../services/user');

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, image, roleId } = req.body;

    const data = await createUser(
      firstName,
      lastName,
      email,
      password,
      image,
      roleId,
    );
    res.status(201).json({
      message: 'user created',
      data,
    });
  } catch (error) {
    console.log(error);
  }
};

const getUser = async (req, res) => {
  try {
    const { userId } = req;

    const data = await findUserById(userId);

    if (data) {
      res.status(200).json({ message: 'user', data });
    } else {
      // si esta autenticado que error va?
      res.status(400).send('user not found');
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  register,
  getUser,
};

// ESLINT TEMPORAL
