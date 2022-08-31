const jwt = require('jsonwebtoken');

const generateJWT = (uid, name, role) => new Promise((resolve, reject) => {
  const payload = { uid, name, role };

  jwt.sign(payload, process.env.SECRET_JWT_SEED, {
    expiresIn: '72h',
  }, (err, token) => {
    if (err) {
      reject(Error('No se pudo generar el token'));
    }

    resolve(token);
  });
});

const validateJWT = (token) => {
  if (!token) {
    return {
      status: false,
      message: 'Token is requeried',
      data: {},
    };
  }
  try {
    const { uid, name, role } = jwt.verify(
      token,
      process.env.SECRET_JWT_SEED,
    );
    return {
      status: true,
      message: 'success',
      data: {
        uid,
        name,
        role,
      },
    };
  } catch (error) {
    return {
      status: false,
      message: 'Not valid Token',
      data: {},
    };
  }
};

module.exports = {
  generateJWT,
  validateJWT,
};
