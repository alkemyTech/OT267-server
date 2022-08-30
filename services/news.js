const { News } = require('../models/index');

const createNews = async (data) => {
  const { name, content, image, categoryId } = data
  return News.create({
    name,
    content,
    image,
    categoryId,
    type: 'news',
  })
}

module.exports = { createNews };
