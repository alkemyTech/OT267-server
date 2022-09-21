const { error } = require('../helpers/requestResponses');

const isCurrentUser = async (req, res, next) => {
  const { id } = req.params;
  const { userId, roleId } = req;

  if (userId === id || roleId === 1) return next();

  return error({ res, message: 'forbidden: unauthorized user', status: 403 });
};

module.exports = { isCurrentUser };
