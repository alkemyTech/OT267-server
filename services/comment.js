const { Comment } = require('../models/index');

const getComments = async () => {
  const data = await Comment.findAll({});
  const response = data.sort((a, b) => {
    if (b.createdAt < a.createdAt) return 1;
    return -1;
  }).map((e) => e.body);
  return response;
};

const createComment = async (data) => Comment.create({
  ...data,
});

module.exports = {
  getComments,
  createComment,
};
