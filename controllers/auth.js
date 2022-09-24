const {
  sendMail,
  success,
  error,
  serverError,
  comparePassword,
  generateJWT,
} = require('../helpers');

const { newUser, findByPkUser, findOneUser } = require('../services/user');

const register = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await newUser({ ...req.body });

    const token = await generateJWT(user.id, user.firstName, user.roleId);

    const sent = await sendMail(email);

    if (sent) {
      success({
        res,
        message: 'user created',
        data: { user, token },
        status: 201,
      });
    } else { error({ message: 'Bad request' }); }
  } catch (err) {
    serverError({ res, message: err.message });
  }
};

const getUser = async (req, res) => {
  try {
    const { userId } = req;

    const data = await findByPkUser(userId);

    success({ res, message: 'user data', data });
  } catch (err) {
    serverError({ res, message: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  try {
    const userFound = await findOneUser(email);

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
        status: 200,
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
