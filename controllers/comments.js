const { success, serverError } = require('../helpers');
const { createComment } = require('../services/comment');

const createNewComment = async (req, res) => {
  try {
    const data = await createComment(req.body);
    success({
      res,
      message: 'comment created',
      data,
      status: 201,
    });
  } catch (err) {
    serverError({ res, message: err.message });
  }
};

module.exports = { createNewComment };
