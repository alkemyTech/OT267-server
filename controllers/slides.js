const { success, error, serverError } = require('../helpers/requestResponses');
const { deleteSlideByPk } = require('../services/slide');

const deleteSlide = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await deleteSlideByPk(id);

    return response ? success({
      res,
      message: 'Slide deleted successfully',
    }) : error({
      res,
      message: 'Slide not found',
    });
  } catch (err) {
    return serverError({
      res,
      message: err.message,
    });
  }
};

module.exports = {
  deleteSlide,
};
