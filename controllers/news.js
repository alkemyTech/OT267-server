/* eslint-disable consistent-return */

const { News } = require('../models');

const { Comment } = require('../models');

const {
  success, error, serverError, paginator,
} = require('../helpers');

const {
  newSingleNews, updateByIdNews, findByPkNews, destroySingleNews, findAllByNewsIdComments,
} = require('../services/news');

const getSingleNews = async (req, res) => {
  const { id } = req.params;

  try {
    const newDetail = await findByPkNews(id);
    if (!newDetail) error({ res, message: 'news not found' });
    else success({ res, message: 'news detail', data: newDetail });
  } catch (err) {
    serverError({ res, message: err.message });
  }
};

const deleteSingleNews = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await destroySingleNews(id);
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
    const response = await newSingleNews(name, content, image, categoryId);
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
    await updateByIdNews(id, data);

    const newsUpdated = await findByPkNews(id);

    return success({
      res, message: 'news updated', data: newsUpdated,
    });
  } catch (err) {
    return serverError({ res, message: err.message });
  }
};

const getAllNews = async (req, res) => {
  let data = {};
  try {
    data = await paginator(req, News, {
      attributes: ['id', 'name', 'content', 'image', 'categoryId', 'createdAt'],
      include: {
        model: Comment,
        attributes: ['userId', 'body'],
      },
    });
  } catch (err) {
    return serverError({ res, message: err.message });
  }
  if (data) {
    return success({ res, message: 'list of all news', data });
  }
  return error({ res, message: 'news not found' });
};

const getCommentsOfSingleNews = async (req, res) => {
  const { id } = req.params;
  let data = [];
  try {
    const news = await findByPkNews(id);

    if (!news) return error({ res, message: 'news not found' });

    data = await findAllByNewsIdComments(id);
  } catch (err) {
    return serverError({ res, message: err.message });
  }
  return (data[0] !== undefined)
    ? success({ res, message: `list of all comments from new ${id} `, data })
    : error({ res, message: 'comments not found' });
};

module.exports = {
  getSingleNews,
  deleteSingleNews,
  createSingleNews,
  updateSingleNews,
  getAllNews,
  getCommentsOfSingleNews,
};
