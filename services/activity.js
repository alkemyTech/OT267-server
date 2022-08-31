const { Activity } = require('../models/index');

const allActivities = async () => Activity.findAll({
  attributes: [
    'id',
    'name',
    'content',
    'image',
  ],
});

const newActivity = async (
  name,
  content,
  image,
) => Activity.create({
  name,
  content,
  image,
});

const updateActivityByPk = async (id, data) => {
  const {
    name, content, image,
  } = data;

  return Activity.update({
    name, content, image,
  }, { where: { id } });
};

const getActivityById = async (id) => Activity.findByPk(id);

module.exports = {
  allActivities,
  newActivity,
  updateActivityByPk,
  getActivityById,
};
