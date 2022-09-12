const { Comment } = require('../models/index');

const createComment = async (data) => Comment.create({
  ...data,
});

const findComentById = async (id) => Comment.findOne({ where: { id } });

const updateComment = async (id, body) => Comment.update({ body }, { where: { id } });

const deleteComment = async (id) => Comment.destroy({ where: { id } });

module.exports = {
  createComment,
  updateComment,
  findComentById,
  deleteComment,
};
