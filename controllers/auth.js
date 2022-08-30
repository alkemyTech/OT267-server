/* eslint-disable no-console */
const { body } = require('express-validator');

const { validationResult } = require('express-validator');

const { generateJWT } = require('../helpers/jwt');

const { comparePassword } = require('../helpers/bcrypt');

const { createUser, findUserById, findUsers } = require('../services/user');

const { sendMail } = require('../helpers/sendMail');

const { htmlTemplate } = require('../templates/welcomeMessage');

const register = async (req, res) => {
  try {
    const {
      firstName, lastName, email, password, image, roleId,
    } = req.body;

    const user = await createUser(
      firstName,
      lastName,
      email,
      password,
      image,
      roleId,
    );

    const token = await generateJWT(user.id, user.firstName, user.roleId);

    res.status(201).json({
      message: 'user created',
      data: { user, token },
    });

    // Send mail of welcome
    await sendMail(email, 'Bienvenido a Somos Más ONG.', '', htmlTemplate);
  } catch (error) {
    res.status(500).json({ message: 'server error', error });
  }
};

const getUser = async (req, res) => {
  try {
    const { userId } = req;

    const data = await findUserById(userId);

    res.status(200).json({ message: 'user', data });
  } catch (error) {
    res.status(500).json({ message: 'server error', error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  body(email).isEmail(),
  body(password).isLength({ min: 8 }).matches(/\d/).matches('[A-Z]')
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

    if (comparePassword(password, userFound.password)) {
      const token = await generateJWT(
        userFound.id,
        userFound.name,
        userFound.roleId,
      );
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
          token,
        },
      });
    } else {
      res.status(404).json({
        message: 'Invalid user or password',
      });
    }
  } catch (error) {
    res.status(404).json({
      message: 'Error: please try again later',
    });
  }
};
module.exports = {
  register,
  getUser,
  login,
};

// ESLINT TEMPORAL
