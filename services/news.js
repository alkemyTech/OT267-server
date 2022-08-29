const { News } = require('../models/index');

const deleteNews = async (id) => {
  const response = await News.destroy({
    where: { id },
  });
  return response;
};

module.exports = { deleteNews };
