/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const { User } = require('../models/index');
const { Role } = require('../models/index');

const { encryptPassword } = require('../helpers/index');

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

module.exports = {
  createUser,
};

// ESLINT TEMPORAL
