const { success, error, serverError } = require('../helpers');
const {
  getComments,
  createComment,
  updateComment,
  deleteComment,
} = require('../services/comment');

const getAllComments = async (req, res) => {
  try {
    const data = await getComments();
    return success({ res, message: 'List of all comments', data });
  } catch (err) {
    return serverError({ res, message: err.message });
  }
};

const createNewComment = async (req, res) => {
  const { userId } = req;
  const { body, newsId } = req.body;

  try {
    const data = await createComment({ userId, body, newsId: +newsId });

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

const updateSingleComment = async (req, res) => {
  const { id } = req.params;
  const { body } = req.body;
  try {
    const [response] = await updateComment(id, body);

    return response
      ? success({
        res,
        message: 'comment updated',
        status: 200,
      })
      : error({ res, message: 'comment not found' });
  } catch (err) {
    return serverError({ res, message: err.message });
  }
};

const deleteSingleComment = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await deleteComment(id);
    if (response === 0) return error({ res, message: 'comment nof found' });

    return success({
      res,
      message: 'comment delete',
      status: 200,
    });
  } catch (err) {
    return serverError({
      res,
      message: err.message,
      status: 500,
    });
  }
};

module.exports = {
  getAllComments,
  createNewComment,
  updateSingleComment,
  deleteSingleComment,
};
