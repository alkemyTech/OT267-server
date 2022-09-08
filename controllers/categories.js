const { success, error, serverError } = require('../helpers');
const {
  deleteCategory,
  allCategoriesName,
  updateCategoryByPk,
  findCategoryById,
  createCategory,
} = require('../services/category');

const createNewCategory = async (req, res) => {
  try {
    const data = await createCategory(req.body);

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

const getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await findCategoryById(id);
    success({ res, message: 'category detail', data: category });
  } catch (err) {
    serverError({ res, message: err.message });
  }
};

const deleteSingleCategory = async (req, res) => {
  const { id } = req.params;

  try {
    await deleteCategory(id);
  } catch (err) {
    serverError({ res, message: err.message });
  }
  return success({ res, message: 'category deleted' });
};

const getAllCategoriesName = async (req, res) => {
  try {
    const categoriesName = await allCategoriesName();
    success({
      res,
      message: 'list of the name of all categories',
      data: categoriesName,
    });
  } catch (err) {
    serverError({ res, message: err.message });
  }
};

const updateSingleCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedCategory = await updateCategoryByPk(id, req.body);
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

module.exports = {
  deleteSingleCategory,
  getCategoryById,
  getAllCategoriesName,
  createNewCategory,
  updateSingleCategory,
};
