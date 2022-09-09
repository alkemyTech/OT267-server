const { success, serverError } = require('../helpers');
const { getComments, createComment } = require('../services/comment');

const getAllComments = async (req, res) => {
  try {
    const data = await getComments();
    return success({ res, message: 'List of all comments', data });
  } catch (err) {
    return serverError({ res, message: err.message });
  }
};

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

module.exports = { getAllComments, createNewComment };
