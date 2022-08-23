const { validateJWT } = require("../helpers/jwt");
const { User } = require("../models/index");

const isAuth = async (req, res, next) => {
  // const token = req.header["x-token"];

  // const { uid, message, status } = validateJWT(token);

  let uid = 11;
  let message = "Hola";
  let status = true;

  if (status === false) {
    return res.status(403).json({
      status,
      message,
      data: {},
    });
  }

  const userExists = await User.findByPk(uid);

  if (!userExists) {
    return res.status(403).json({
      status: false,
      message: "User not exists",
      data: {},
    });
  }

  req.message = "User exists";
  req.status = true;
  req.roleId = userExists.dataValues.roleId;

  next();
};

module.exports = { isAuth };
