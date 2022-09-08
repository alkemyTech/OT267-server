const { success, error, serverError } = require('../helpers/requestResponses');
const {
  allActivities,
  newActivity,
  updateActivityByPk,
  getActivityById,
} = require('../services/activity');

const getAllActivities = async (req, res) => {
  try {
    const data = await allActivities();

    if (data) success({ res, message: 'list of all activities', data });
    else error({ res, message: 'activities not found' });
  } catch (err) {
    serverError({ res, message: err.message });
  }
};

const createNewActivity = async (req, res) => {
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

const updateSingleActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await updateActivityByPk(id, req.body);
    if (response[0] === 0) return error({ res, message: 'activity not found' });

    const activityUpdated = await getActivityById(id);

    return success({
      res, message: 'activity updated', data: activityUpdated, status: 201,
    });
  } catch (err) {
    return serverError({ res, message: err.message });
  }
};

module.exports = { getAllActivities, createNewActivity, updateSingleActivity };
