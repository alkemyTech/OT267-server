/* eslint-disable max-len */
const { News, Comment } = require('../models/index');

const findByPkNews = async (id) => News.findByPk(id);

const destroySingleNews = async (id) => {
  const response = await News.destroy({
    where: { id },
  });
  return response;
};

const newSingleNews = async (name, content, image, categoryId) => (News.create({
  name,
  content,
  image,
  categoryId,
  type: 'news',
})
);

const updateByIdNews = async (id, data) => News.update({ ...data }, { where: { id } });

const findAllByNewsIdComments = (id) => Comment.findAll({
  where: {
    newsId: id,
  },
});

module.exports = {
  findByPkNews,
  newSingleNews,
  updateByIdNews,
  destroySingleNews,
  findAllByNewsIdComments,
};
