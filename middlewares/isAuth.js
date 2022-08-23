const { includes } = require("lodash");
const { validateJWT } = require("../helpers/jwt");
const { User } = require("../models/user");

const isAuth = async (req, res, next) => {
  const token = req.header["x-token"];

  const { uid, name, status, message } = validateJWT(token);

  if (status === false) {
    return res.status(403).json({
      status,
      message,
      data: {},
    });
  }

  const userExists = await User.findByPk(id, { include: "roleId" });

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
