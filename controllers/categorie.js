// eslint-disable-next-line no-return-await
const { createCategory } = require('../services/category');

const list = async (_req, res) => res.send('respond with a resource');

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

  if (!newCategory) return res.status(400).json({ message: 'Something was wrong during creating the category' });

  return res.status(201).json({
    message: 'Category created',
    data: newCategory,
  });
};

module.exports = {
  list,
  createNewCategory,
};

// ESLINT TEMPORAL
