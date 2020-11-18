require('dotenv').config({ path: __dirname + '/.env' });
module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'ebooks_development',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'ebooks_test',
    host: '127.0.0.1',
    dialect: ' mysql',
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'ebooks_production',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};
