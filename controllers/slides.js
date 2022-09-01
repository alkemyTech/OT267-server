const { success, error, serverError } = require('../helpers/requestResponses');
const { updateSlideByPk } = require('../services/slide');

const updateSlide = async (req, res) => {
  try {
    const { id } = req.params;
    const [response] = await updateSlideByPk(id, req.body);

    return response ? success({
      res,
      message: 'Slide updated successfully',
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
  updateSlide,
};
