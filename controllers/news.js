const { createNews } = require('../services/news');

const createANews = async (req, res) => {
  const data = req.body;

  try {
    const response = await createNews(data);

    res.status(201).json({
      menssage: 'news created',
      data: response,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  createANews,
};
