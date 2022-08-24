const { User } = require('../models/index');
const { Role } = require('../models/index');

const { encryptPassword } = require('../helpers/bcryptHelper');

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

        //rol defined validation
        if (roleId) {
            let matchedRole = await Role.findOne({
                where: { id: roleId },
            });
            if (matchedRole === null) {
                res.status(400).json({ msg: 'Rol no existente' });
            } else {
                const newUser = await User.create({
                    firstName,
                    lastName,
                    email,
                    password: encrypted,
                    image,
                });
                newUser.setRole(roleId);
                const response = {
                    nombre: newUser.firstName,
                    apellido: newUser.lastName,
                    correo: newUser.email,
                    rol:
                        newUser.roleId === 1
                            ? 'Usuario administrador'
                            : 'Usuario regular',
                    foto: newUser.image,
                };
                res.status(201).json({
                    msg: 'Su usuario se ha creado exitosamente',
                    response,
                });
            }
        } else {
            const newUser = await User.create({
                firstName,
                lastName,
                email,
                password: encrypted,
                image,
            });

            //rol undefined - default assigment
            newUser.setRole(2);

            const response = {
                nombre: newUser.firstName,
                apellido: newUser.lastName,
                correo: newUser.email,
                rol: 'Usuario regular',
                foto: newUser.image,
            };

            res.status(201).json({
                msg: 'Su usuario se ha creado exitosamente',
                response,
            });
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    createUser,
};
