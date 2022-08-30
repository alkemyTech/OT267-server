const { createNews, updateNews, findNewsById } = require('../services/news');

const createANews = async (req, res) => {
  const {
    name, content, image, categoryId,
  } = req.body;

  try {
    const response = await createNews(name, content, image, categoryId);

    res.status(201).json({
      menssage: 'news created',
      data: response,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateANews = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  if (Number.isNaN(Number(id))) {
    return res.status(400).send('The id must be a number');
  }

  try {
    const response = await updateNews(id, data);

    if (response[0] === 0) return res.status(404).send('news not found');

    const newsUpdated = await findNewsById(id);

    return res.status(201).json({
      menssage: 'news updated',
      data: newsUpdated,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  createANews, updateANews,
};
