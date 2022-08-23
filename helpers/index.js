const { generateJWT, validateJWT } = require('./jwt');

module.exports = {
    ...generateJWT,
    ...validateJWT
};