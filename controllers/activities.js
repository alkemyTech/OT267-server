const { success, error, serverError } = require('../helpers');

const {
  findAllActivities,
  newActivity,
  updateByIdActivity,
  findByPkActivity,
} = require('../services/activity');

const getActivities = async (req, res) => {
  try {
    const data = await findAllActivities();

    if (data) success({ res, message: 'list of all activities', data });
    else error({ res, message: 'activities not found' });
  } catch (err) {
    serverError({ res, message: err.message });
  }
};

const createActivity = async (req, res) => {
  const {
    name, content, image,
  } = req.body;
  try {
    const data = await newActivity(name, content, image);

    success({
      res,
      message: 'activity created',
      data,
      status: 201,
    });
  } catch (err) {
    serverError({ res, message: err.message });
  }
};

const updateActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await updateByIdActivity(id, req.body);
    if (response[0] === 0) return error({ res, message: 'activity not found' });

    const activityUpdated = await findByPkActivity(id);

    return success({
      res, message: 'activity updated', data: activityUpdated, status: 201,
    });
  } catch (err) {
    return serverError({ res, message: err.message });
  }
};

module.exports = { getActivities, createActivity, updateActivity };
