const { validateJWT } = require('../helpers/jwt');
const { User } = require('../models/index');

const isAuth = async (req, res, next) => {
  const token = req.headers.authorization;

  const {
    message,
    data: { uid },
  } = validateJWT(token);

  if (!uid) return res.status(401).json({ message, data: {} });

  // Averiguo si el usuario existe
  let userExists;

  try {
    userExists = await User.findByPk(uid);
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong', data: {} });
  }

  if (!userExists) {
    return res.status(404).json({ message: 'User not exists', data: {} });
  }

  // Agrego al req el id del rol para el proximo middleware que lo necesite
  req.roleId = userExists.dataValues.roleId;
  req.userId = userExists.dataValues.id;

  return next();
};

module.exports = { isAuth };
