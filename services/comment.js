const { Comment } = require('../models/index');

const createComment = async (data) => Comment.create({
  ...data,
});

module.exports = {
  createComment,
};
