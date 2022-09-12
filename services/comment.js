const { Comment } = require('../models/index');

const getComments = () => Comment.findAll({
  order: [
    ['createdAT', 'ASC'],
  ],
  attributes: [
    'body',
  ],
});

const createComment = async (data) => Comment.create({
  ...data,
});

module.exports = {
  getComments,
  createComment,
};
