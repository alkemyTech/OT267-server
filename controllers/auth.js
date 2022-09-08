const {
  sendMail,
  success,
  error,
  serverError,
  comparePassword,
  generateJWT,
} = require('../helpers');
const { createUser, findUserById, findUsers } = require('../services/user');
const { htmlTemplate } = require('../templates/welcomeMessage');

const register = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await createUser({ ...req.body });

    const token = await generateJWT(user.id, user.firstName, user.roleId);

    success({
      res,
      message: 'user created',
      data: { user, token },
      status: 201,
    });

    // send welcome email
    await sendMail(email, 'Bienvenido a Somos Más ONG.', '', htmlTemplate);
  } catch (err) {
    serverError({ res, message: err.message });
  }
};

const getUser = async (req, res) => {
  try {
    const { userId } = req;

    const data = await findUserById(userId);

    success({ res, message: 'user data', data });
  } catch (err) {
    serverError({ res, message: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await findUsers(email);

    if (!userFound) return error({ res, message: 'user not found', status: 404 });

    if (comparePassword(password, userFound.password)) {
      const token = await generateJWT(
        userFound.id,
        userFound.name,
        userFound.roleId,
      );
      return success({
        res,
        message: 'successfull login',
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
        status: 201,
      });
    }
    return error({ res, message: 'invalid email or password', status: 401 });
  } catch (err) {
    return serverError({ res, message: err.message });
  }
};

module.exports = {
  register,
  getUser,
  login,
};
