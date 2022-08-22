const { User } = require('../models/index');

const deleteUser = async (id) => {
    return await User.destroy({
        where: { id }
    });
}

module.exports = {
    deleteUser,
};