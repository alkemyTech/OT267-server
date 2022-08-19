/**
 * En el archivo index se genera todos los modelos de las base de datos
 * a los cuales se puede acceder de la siguiente form
 */
const { User } = require('./index');

const getRoles = async () => {
    // Cada modelo contiene los métodos normales.
  const roles = await User.findAll();
  console.log(roles)
}

getRoles()