const { success, error, serverError } = require('../helpers/requestResponses');

const {
  createNews, updateNews, getNewById, deleteNews,
} = require('../services/news');

const getNewDetail = async (req, res) => {
  const { id } = req.params;

  let newDetail;
  try {
    newDetail = await getNewById(id);
  } catch (err) {
    serverError({ res, message: err.message });
  }
  if (!newDetail) return error({ res, message: 'news not found' });
  return success({ res, message: 'news detail', data: newDetail });
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

const createANews = async (req, res) => {
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

const updateANews = async (req, res) => {
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

module.exports = {
  getNewDetail,
  deleteSingleNews,
  createANews,
  updateANews,
};
