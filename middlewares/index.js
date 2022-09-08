const { isAdmin } = require('./isAdmin');
const { isAuth } = require('./isAuth');
const { isCurrentUser } = require('./ownership');
const { uploadFile } = require('./uploadFile');
const { handleResult } = require('./validateFields');

module.exports = {
  isAdmin,
  isAuth,
  isCurrentUser,
  uploadFile,
  handleResult,
};
