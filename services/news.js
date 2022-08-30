const { News } = require('../models/index');

const getNewById = async (id) => News.findByPk(id);

module.exports = {
  getNewById,
};

const createNews = async (name, content, image, categoryId) => (News.create({
  name,
  content,
  image,
  categoryId,
  type: 'news',
})
);

const updateNews = async (id, data) => {
  const {
    name, image, content, type, categoryId,
  } = data;

  return News.update({
    name, image, content, type, categoryId,
  }, { where: { id } });
};

module.exports = { createNews, updateNews };
