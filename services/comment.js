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

const findComentById = async (id) => Comment.findOne({ where: { id } });

const updateComment = async (id, body) => Comment.update({ body }, { where: { id } });

module.exports = {
  getComments,
  findComentById,
  createComment,
  updateComment,
};
