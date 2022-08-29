const { deleteNews } = require('../services/news');

/* eslint-disable no-console */
const deleteSingleNews = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await deleteNews(id);
    if (response === 0) res.status(404).json({ message: 'Not found' });
    else res.status(200).json({ message: 'News deleted succesfuly' });
  } catch (error) {
    res.status(500).json({ message: 'Error: Something went wrong. Please try again later.' });
  }
};

module.exports = {
  deleteSingleNews,
};
