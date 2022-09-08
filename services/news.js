const { News } = require('../models/index');

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

module.exports = {
  getNewById,
  createNews,
  updateNews,
  deleteNews,
};
