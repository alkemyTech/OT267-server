const { deleteCategory } = require('../services/category');

const deleteSingleCategory = async (req, res) => {
  const { id } = req.params;
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
};
