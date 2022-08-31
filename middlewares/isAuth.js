const { validateJWT } = require('../helpers/jwt');

const { User } = require('../models/index');

const { error, serverError } = require('../helpers/requestResponses');

const isAuth = async (req, res, next) => {
  const token = req.headers.authorization;

  const { data: { uid } } = validateJWT(token);

  if (!uid) return error({ res, message: 'unauthorized: id is required', status: 401 });

  // Averiguo si el usuario existe
  let userExists;

  try {
    userExists = await User.findByPk(uid);
  } catch (err) {
    serverError({ res, message: err.message });
  }

  if (!userExists) {
    return error({ res, message: 'user not found' });
  }

  // Agrego al req el id del rol para el proximo middleware que lo necesite
  req.roleId = userExists.dataValues.roleId;
  req.userId = userExists.dataValues.id;

  return next();
};

module.exports = { isAuth };
