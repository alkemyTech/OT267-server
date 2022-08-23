const { User } = require('../models/index');

// getAllUsers,
const allUsers = async () => {
    const allUsers = await User.findAll({
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
    return allUsers;
};

module.exports = {
    allUsers,
};
