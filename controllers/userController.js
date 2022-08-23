const { allUsers } = require('../services/user');

// getAllUsers,
const getAllUsers = async (req, res) => {
    try {
        const response = await allUsers();

        if (response) {
            res.status(201).json({ msg: 'All users', response });
        } else {
            res.status(400).send('users not found');
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getAllUsers,
};
