const { Comment } = require('../models/index');

const createComment = async (data) => Comment.create({
  ...data,
});

const deleteComment = async (id) => Comment.destroy({ where: { id } });

module.exports = {
  createComment,
  deleteComment,
};
