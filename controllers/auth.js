/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

const { User } = require('../models/index');
const { Role } = require('../models/index');
const { body, validationResult } = require('express-validator');
const { comparePassword } = require('../helpers/bcrypt');
const { findUsers } = require('../services/user');
const { encryptPassword } = require('../helpers/index');
const { generateJWT } = require('../helpers');

const createUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      passwordConfirmation,
      image,
      roleId,
    } = req.body;

    const encrypted = await encryptPassword(password);

    // rol defined validation
    if (roleId) {
      const matchedRole = await Role.findOne({
        where: { id: roleId },
      });
      if (matchedRole === null) {
        res.status(400).json({ message: 'role non-existent' });
      } else {
        const newUser = await User.create({
          firstName,
          lastName,
          email,
          password: encrypted,
          image,
          roleId,
        });

        const data = await User.findOne({
          where: { email },
          attributes: { exclude: ['password'] },
        });
        res.status(201).json({
          message: 'user created',
          data,
        });
      }
    } else {
      // role undefined
      const newUser = await User.create({
        firstName,
        lastName,
        email,
        password: encrypted,
        image,
        roleId: 2,
      });
      const data = await User.findOne({
        where: { email },
        attributes: { exclude: ['password'] },
      });
      res.status(201).json({
        message: 'user created',
        data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

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
    
    if(comparePassword(password, userFound.password)){
      const token = await generateJWT(userFound.id, userFound.name, userFound.roleId);
      res.status(201).json({
        message: 'Login successfully',
        data: {
          user: {
            id: userFound.id,
            firstName: userFound.firstName,
            lastName: userFound.lastName,
            email: userFound.email,
            image: userFound.image,
            roleId: userFound.roleId,
          },
          token
        }
      });
    } else {
      res.status(404).json({
        message: 'Invalid user or password',
      });
    }
  } catch (error) {
    res.status(404).json({
      message: 'Error: please try again later'
    });
  }
};
module.exports = {
  createUser,
  login
};

// ESLINT TEMPORAL
