/* eslint-disable consistent-return */
/* eslint-disable no-empty */
/* eslint-disable max-len */
const { News } = require('../models');

const { Comment } = require('../models');

const {
  success, error, serverError, paginator,
} = require('../helpers');

const {
  createNews, updateNews, getNewsById, deleteNews, findAllCommentsByNewsId,
} = require('../services/news');

const getNewsDetail = async (req, res) => {
  const { id } = req.params;

  try {
    const newDetail = await getNewsById(id);
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

    const newsUpdated = await getNewsById(id);

    return success({
      res, message: 'news updated', data: newsUpdated, status: 201,
    });
  } catch (err) {
    return serverError({ res, message: err.message });
  }
};

const getAllNews = async (req, res) => {
  const { by, order } = req.query;

  if (by === undefined || by === 'id' || by === 'createdAt' || by === 'name' || by === 'content' || by === 'image' || by === 'categoryId' || by === 'createdAt') { } else {
    return error({ res, message: 'by parameter not valid', status: 400 });
  }

  if (order === undefined || order === 'ASC' || order === 'DESC') { } else {
    return error({ res, message: 'order parameter not valid', status: 400 });
  }

  try {
    const data = await paginator(req, News, 'news', {
      attributes: ['id', 'name', 'content', 'image', 'categoryId', 'createdAt'],
      include: {
        model: Comment,
        attributes: ['userId', 'body'],
      },
    }, by, order);
    if (data) {
      success({ res, message: 'list of all news', data });
    } error({ res, message: 'news not found' });
  } catch (err) {
    serverError({ res, message: err.message });
  }
};

const getAllCommentsByNews = async (req, res) => {
  const { id } = req.params;

  try {
    const findNewsByID = await getNewsById(id);

    if (!findNewsByID) return error({ res, message: 'news ID not found' });

    const data = await findAllCommentsByNewsId(id);
    
    if (!data) return error({ res, message: 'comments not found' });
    
    return success({ res, message: `list of all comments from new ${id} `, data });
  } catch (err) {
    return serverError({ res, message: err.message });
  }
};

module.exports = {
  getNewsDetail,
  deleteSingleNews,
  createSingleNews,
  updateSingleNews,
  getAllNews,
  getAllCommentsByNews,
};
