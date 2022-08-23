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

const deleteUser = async (id) => {
    return await User.destroy({
        where: { id }
    });
}

module.exports = {
    allUsers, deleteUser
};
