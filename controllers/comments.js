const { success, serverError, error } = require('../helpers');
const { createComment, deleteComment } = require('../services/comment');

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

const deleteSingleComment = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await deleteComment(id);
    if (response === 0) return error({ res, message: 'comment nof found' });

    success({
      res,
      message: 'comment delete',
      status: 200,
    });
  } catch (err) {
    serverError({
      res,
      message: err.message,
      status: 500,
    });
  }
};

module.exports = {
  createNewComment,
  deleteSingleComment,
};
