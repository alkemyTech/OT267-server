/* eslint-disable max-len */
const { News, Comment } = require('../models/index');

const getNewById = async (id) => News.findByPk(id);

const deleteNews = async (id) => {
  const response = await News.destroy({
    where: { id },
  });
  return response;
};

const createNews = async (name, content, image, categoryId) => (News.create({
  name,
  content,
  image,
  categoryId,
  type: 'news',
})
);

const updateNews = async (id, data) => News.update({ ...data }, { where: { id } });

const findAllCommentsByNewId = async (id) => {
  const response = await Comment.findAll({
    where: {
      newsId: id,
    },
  });
  return response;
};

module.exports = {
  getNewById,
  createNews,
  updateNews,
  deleteNews,
  findAllCommentsByNewId,
};
