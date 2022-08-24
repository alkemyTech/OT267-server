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
    return await User.destroy({
        where: { id },
    });
};

module.exports = {
    allUsers,
    deleteUser,
};
