/* eslint-disable no-unused-vars */
const { success, error, serverError } = require('../helpers/requestResponses');
const { list } = require('../services/members.js')

const membersList = async (req, res) => {

  try {

    const data = await list(); 
    
    if (data.length === 0) return error({ res, message: 'No members' });

    return success({ res, message: 'Members list', data });
  
  } catch (err) {

    serverError({ res, message: err.message }); 

  } 
}

module.exports = {
  membersList,
}; 