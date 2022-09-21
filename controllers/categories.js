const {
  success, error, serverError, paginator,
} = require('../helpers');

const {
  destroyCategory,
  findByPkCategory,
  findOrCreateCategory,
  updateByIdCategory,
} = require('../services/category');

const { Category } = require('../models');

const getCategories = async (req, res) => {
  try {
    const categoriesName = await paginator(req, Category, { attributes: ['id', 'name'] });
    success({
      res,
      message: 'list of all categories',
      data: categoriesName,
    });
  } catch (err) {
    serverError({ res, message: err.message });
  }
};

const getCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await findByPkCategory(id);
    success({ res, message: 'category detail', data: category });
  } catch (err) {
    serverError({ res, message: err.message });
  }
};

const createCategory = async (req, res) => {
  try {
    const data = await findOrCreateCategory(req.body);

    if (data === false) {
      error({ res, message: 'category already exists', status: 400 });
    } else {
      success({
        res,
        message: 'category created',
        data,
        status: 201,
      });
    }
  } catch (err) {
    serverError({ res, message: err.message });
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedCategory = await updateByIdCategory(id, req.body);
    success({
      res,
      message: 'category updated',
      data: updatedCategory,
      status: 201,
    });
  } catch (err) {
    serverError({ res, message: err.message });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    await destroyCategory(id);
  } catch (err) {
    serverError({ res, message: err.message });
  }
  return success({ res, message: 'category deleted' });
};

module.exports = {
  deleteCategory,
  getCategory,
  getCategories,
  createCategory,
  updateCategory,
};
