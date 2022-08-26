const { findUsers } = require('../services/users');
const {deleteUser} = require('../services/user')
const { body, validationResult } = require('express-validator');
const { comparePassword } = require('../helpers/bcrypt');

const login = async (req, res) => {

    const { email, password } = req.body;

    body(email).isEmail(),
        body(password).isLength({ min: 8 }).matches(/\d/).matches('[A-Z]').trim().trim()

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }

    try {

        const userFound = await findUsers(email)

        if (!userFound) {
            res.status(404).send('Email not registered');
        }

        await comparePassword(password, user.password)
            .then(result => {
                if (result) {
                    res.status(201).json({
                        msg: 'Login successfully',
                        user: userFound
                    });
                } else {
                    res.status(404).json({
                        msg: 'The password is wrong',
                    });
                }
            })
            .catch(error => {
                res.status(404).json({
                    ok: false,
                    error: error
                });
            });

    } catch (error) {

        res.status(404).json({
            ok: false,
            error: error
        });

    }
}

const deleteSingleUser = async (_req, res, next) => {
    const {id} = _req.params
    const response = await deleteUser(id)
    
    if(response === 0) return res.status(404).json({
	status: 404,
	message: 'user does not exist'
    })

    res.status(200).json({ 
        message : 'user deleted'
    })
}

module.exports = {
    login,
    deleteSingleUser
}; 