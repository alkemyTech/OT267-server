const { categoryFindById } = require('../services/category');


const list = async (_req, res) => await res.send('respond with a resource');

const getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await categoryFindById(id);

    if(!category) res.status(404).json({ message: 'Not found' });
    else res.status(200).json({ message: 'succeded', data: category });
  } catch (error) {
    res.status(404).json({ message: 'Error: Something went wrong. Please try again later.' });
  }
};

module.exports = {
  list,
  getCategoryById
};

// ESLINT TEMPORAL
