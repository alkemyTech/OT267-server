const bcrypt = require('bcrypt');

const comparePassword = () => {
    bcrypt.compare(password, passwordHashed, (err, result) => {

        if (err) {
            return err;
        }
        if (result) {
            return true;
        } else {
            return false;
        }
    });
}

module.exports = {
    comparePassword
}