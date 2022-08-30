const { deleteCategory, allCategoriesName } = require('../services/category');

const deleteSingleCategory = async (req, res) => {
  const { id } = req.params;
  
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

const getAllCategoriesName = async (req, res) => {
  try {
    const categoriesName = await allCategoriesName();
    res.status(200).json({
      message: 'All categories.',
      data: categoriesName,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
      data: {},
    });
  }
};

module.exports = {
  deleteSingleCategory,
  getAllCategoriesName,
};
