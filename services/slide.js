const { Slide } = require('../models');

const deleteSlideByPk = async (id) => {
  const deleted = await Slide.destroy({
    where: { id },
  });
  return deleted;
};

module.exports = {
  deleteSlideByPk,
};
