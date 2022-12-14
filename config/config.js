require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    mpUrl: process.env.MP_URL,
    mpPublicKey: process.env.MP_PUBLIC_KEY,
    mpAccessToken: process.env.MP_ACCESS_TOKEN,
    ngrokServerUrl: process.env.NGROK_SERVER_URL,
    mainUrl: process.env.URL,
    logging: false,
    sgApiKey: process.env.SENDGRID_API_KEY,
    sgSender: process.env.SENDGRID_SENDER,

  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    adminToken: process.env.ADMIN_TOKEN,
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
  },
};
