const { User } = require('../models/index');

const allUsers = async () => {
  const users = await User.findAll({
    attributes: [
      'id',
      'firstName',
      'lastName',
      'email',
      'image',
      'password',
      'roleId',
    ],
  });
  return users;
};

const deleteUser = async (id) => {
  await User.destroy({
    where: { id },
  });
};

const findUsers = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (user !== null) {
    return user;
  }
  return null;
};

const updatebyPk = async (id, body) => {

  const user = await User.findByPk(id);
  
  if( !user ) return 0;
  
  for(let i in body){
    user[i] 
    ? user[i] = body[i] 
    : ''
  }
  
  await user.save();
  
  return 1;
} 

module.exports = {
  allUsers,
  deleteUser,
  findUsers,
  updatebyPk
};
