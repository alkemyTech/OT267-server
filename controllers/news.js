const { News } = require('../models');

const {
  success, error, serverError, paginator,
} = require('../helpers');

const {
  createNews, updateNews, getNewById, deleteNews,
} = require('../services/news');

const getNewsDetail = async (req, res) => {
  const { id } = req.params;

  try {
    const newDetail = await getNewById(id);
    if (!newDetail) error({ res, message: 'news not found' });
    else success({ res, message: 'news detail', data: newDetail });
  } catch (err) {
    serverError({ res, message: err.message });
  }
};

const deleteSingleNews = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await deleteNews(id);
    if (response === 0) error({ res, message: 'news not found' });
    else success({ res, message: 'news deleted' });
  } catch (err) {
    serverError({ res, message: err.message });
  }
};

const createSingleNews = async (req, res) => {
  const {
    name, content, image, categoryId,
  } = req.body;

  try {
    const response = await createNews(name, content, image, categoryId);
    success({
      res, message: 'news created', data: response, status: 201,
    });
  } catch (err) {
    serverError({ res, message: err.message });
  }
};

const updateSingleNews = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const response = await updateNews(id, data);

    if (response[0] === 0) return error({ res, message: 'news not found' });

    const newsUpdated = await getNewById(id);

    return success({
      res, message: 'news updated', data: newsUpdated, status: 201,
    });
  } catch (err) {
    return serverError({ res, message: err.message });
  }
};

const getAllNews = async (req, res) => {
  try {
    const data = await paginator(req, News, 'news');

    if (data) success({ res, message: 'list of all news', data });
    else error({ res, message: 'news not found' });
  } catch (err) {
    serverError({ res, message: err.message });
  }
};

module.exports = {
  getNewsDetail,
  deleteSingleNews,
  createSingleNews,
  updateSingleNews,
  getAllNews,
};
