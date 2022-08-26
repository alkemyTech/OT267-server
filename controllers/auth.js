const { User } = require('../models/index');
const { encryptPassword } = require('../helpers/bcryptHelper');
const { sendMail } = require('../helpers/sendMail');
const htmlTemplate = require('../templates/welcomeMessage');

const createUser = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            passwordConfirmation,
            image,
            roleId,
        } = req.body;
        
        const encrypted = await encryptPassword(password);

        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: encrypted,
            image,
        });
        
        const response = {
            nombre: newUser.firstName,
            apellido: newUser.lastName,
            correo: newUser.email,
            foto: newUser.image,
        };

        res.status(201).json({
            msg: 'Su usuario se ha creado exitosamente',
            response,
        });

        // Send mail of welcome
        await sendMail(email, 'Bienvenido a Somos Más ONG', "", htmlTemplate);
        console.log(htmlTemplate)
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    createUser,
};
