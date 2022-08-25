/* eslint-disable no-unused-vars */
const { body, validationResult } = require('express-validator');
const { allUsers, deleteUser, findUsers } = require('../services/user');
const { comparePassword } = require('../helpers/bcrypt');

const login = async (req, res) => {
  const { email, password } = req.body;

  body(email).isEmail(),
  body(password)
    .isLength({ min: 8 })
    .matches(/\d/)
    .matches('[A-Z]')
    .trim()
    .trim();

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }

  try {
    const userFound = await findUsers(email);

    if (!userFound) {
      res.status(404).send('Email not registered');
    }

    await comparePassword(password, user.password)
      .then((result) => {
        if (result) {
          res.status(201).json({
            msg: 'Login successfully',
            user: userFound,
          });
        } else {
          res.status(404).json({
            msg: 'The password is wrong',
          });
        }
      })
      .catch((error) => {
        res.status(404).json({
          ok: false,
          error,
        });
      });
  } catch (error) {
    res.status(404).json({
      ok: false,
      error,
    });
  }
};

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

module.exports = { login, getAllUsers, deleteSingleUser };
