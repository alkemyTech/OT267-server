const { Comment } = require('../models/index');

const findAllComments = () => Comment.findAll({
  order: [
    ['createdAT', 'ASC'],
  ],
  attributes: [
    'body',
  ],
});

const newComment = async (data) => Comment.create(data);

const findOneComent = async (id) => Comment.findOne({ where: { id } });

const updateByIdComment = async (id, body) => Comment.update({ body }, { where: { id } });

const destroyComment = async (id) => Comment.destroy({ where: { id } });

module.exports = {
  findAllComments,
  newComment,
  updateByIdComment,
  findOneComent,
  destroyComment,
};
