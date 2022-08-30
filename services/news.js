const { News } = require('../models/index');

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

const findNewsById = async (id) => {
  const news = await News.findByPk(id);

  return news;
};

module.exports = { createNews, updateNews, findNewsById };
