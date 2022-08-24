const { validateJWT } = require('../helpers/jwt')

const isCurrentUser = async (req, res, next) => {
    const token = req.headers.autorization
    const { id } = req.params
    const { data } = validateJWT(token)

    if (data.uid !== id || data.role !== 'Admin') return res.status(403).send('unauthorized user')

    next()
}

module.exports = { isCurrentUser };
