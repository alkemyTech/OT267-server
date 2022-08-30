// eslint-disable-next-line no-return-await
// ESLINT TEMPORAL

const { deleteCategory } = require('../services/category');
const { createCategory } = require('../services/category');
const { categoryFindById } = require('../services/category');
// ESLINT TEMPORAL

// eslint-disable-next-line no-return-await
const list = async (_req, res) => await res.send('respond with a resource');

const createNewCategory = async (req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string') return res.status(400).json({ message: 'Name field is invalid', data: {} });

  let newCategory;

  try {
    newCategory = await createCategory(name.toLowerCase());
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      data: {},
    });
  }

  if (newCategory[1] === false) return res.status(400).json({ message: 'Category already exists' });

  return res.status(201).json({
    message: 'Category created',
    data: newCategory[0],
  });
};

const getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await categoryFindById(id);

    if (!category) res.status(404).json({ message: 'Not found' });
    else res.status(200).json({ message: 'succeded', data: category });
  } catch (error) {
    res.status(404).json({ message: 'Error: Something went wrong. Please try again later.' });
  }
};

const deleteSingleCategory = async (req, res) => {
  const { id } = req.params;

  // eslint-disable-next-line no-restricted-globals
  if (isNaN(id)) {
    return res.status(400).send('The id must be a number');
  }

  try {
    const response = await deleteCategory(id);

    if (response === 0) {
      return res.status(404).send('category does not exist');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }

  return res.status(200).json({
    message: 'category deleted',
  });
};

module.exports = {
  deleteSingleCategory,
  list,
  getCategoryById,
  createNewCategory,
};
