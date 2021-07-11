
const dotenv = require("dotenv");
const path = require('path')
// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '../../.env') });

const env = process.env;
const host = env.USING_DOCKER == 1 ? env.DB_DOCKER_HOST: env.DB_HOST 
const x = { // for connecting to the development or test database
  development: {
    database: env.DB_NAME,
    port: env.DB_PORT,
    host: host,
  },
  production: { // for production database server 
    database: env.HEROKU_DB,
    port:  env.DB_PORT,
    host: env.HEROKU_HOST,
  },
};
module.exports = x;