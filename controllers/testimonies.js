const { success, error, serverError } = require('../helpers/requestResponses');

const {
  allTestimonies, createTestimony, findTestimonyByPk, findTestimony, updateTestimonies, destroyTestimony,
} = require('../services/testimony');

const getAllTestimonies = async (req, res) => {
  try {
    const data = await allTestimonies();

    if (data) success({ res, message: 'list of all testimonies', data });
    else error({ res, message: 'tesmimonies not found' });
  } catch (err) {
    serverError({ res, message: err.message });
  }
};

const createATestimony = async (req, res) => {
  const { name, content } = req.body;

  try {
    const newTestimony = await createTestimony(name, content);

    if (!newTestimony) return error({ res, message: 'Testimony already exists', status: 400 });

    return success({
      res,
      message: 'Testimony created',
      status: 201,
      data: newTestimony,
    });
  } catch (err) {
    return serverError({ res, message: err.message });
  }
};

const updateTestimony = async (req, res) => {
  const { id } = req.params;

  const data = req.body;

  try {
    const testimony = await findTestimony(id);

    if (!testimony) return error({ res, message: 'Testimony not found' });

    await updateTestimonies(id, data);

    const testimonyUpdated = await findTestimony(id);

    return success({
      res, message: 'Testimony updated', data: testimonyUpdated,
    });
  } catch (err) {
    return serverError({ res, message: err.message });
  }
};

const deleteTestimony = async (req, res) => {
  const { id } = req.params;
  const matchedId = await findTestimonyByPk(id);
  try {
    if (matchedId) {
      await destroyTestimony(id);
      success({ res, message: 'testimony deleted' });
    } else {
      error({ res, message: 'Testimony not found' });
    }
  } catch (err) {
    serverError({ res, message: err.message });
  }
};

module.exports = {
  getAllTestimonies, createATestimony, updateTestimony, deleteTestimony,
};
