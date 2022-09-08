const { Activity } = require('../models/index');

const allActivities = async () => Activity.findAll({
  attributes: ['id', 'name', 'content', 'image'],
});

const newActivity = async (name, content, image) => Activity.create({
  name,
  content,
  image,
});

const updateActivityByPk = async (id, data) => Activity.update({ ...data }, { where: { id } });

const getActivityById = async (id) => Activity.findByPk(id);

module.exports = {
  allActivities,
  newActivity,
  updateActivityByPk,
  getActivityById,
};
