const { validateJWT } = require("../helpers/jwt");
const { User } = require("../models/index");

const isAuth = async (req, res, next) => {
  const token = req.header["x-token"];

  const { uid, message, status } = validateJWT(token);

  if (status === false) {
    return res.status(403).json({
      status,
      message,
      data: {},
    });
  }

  const userExists = await User.findByPk(uid, { includes: "roleId" });
  console.log(userExists);

  if (!userExists) {
    return res.status(403).json({
      status: false,
      message: "User not exists",
      data: {},
    });
  }

  req.user = userExists;

  next();
};

module.exports = { isAuth };
