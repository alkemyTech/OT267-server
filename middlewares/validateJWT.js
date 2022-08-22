const { response } = require("express")
const jwt = require('jsonwebtoken')


const validateJWT = (req, res = response, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'Token is requeried'
        })
    }

    try {
        const { uid, name } = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );

        req.uid = uid;
        req.name = name;
        req.role = role;


    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Not valid Token'
        });
    }
    next();
}

module.exports = {
    validateJWT
}