const { success, error, serverError } = require('../helpers');
const {
  findAllComments,
  newComment,
  updateByIdComment,
  destroyComment,
} = require('../services/comment');

const getComments = async (req, res) => {
  try {
    const data = await findAllComments();
    return success({ res, message: 'List of all comments', data });
  } catch (err) {
    return serverError({ res, message: err.message });
  }
};

const createComment = async (req, res) => {
  const { userId } = req;
  const { body, newsId } = req.body;

  try {
    const data = await newComment({ userId, body, newsId: +newsId });

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

const updateComment = async (req, res) => {
  const { id } = req.params;
  const { body } = req.body;
  try {
    const [response] = await updateByIdComment(id, body);

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

const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await destroyComment(id);
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
  getComments,
  createComment,
  updateComment,
  deleteComment,
};
