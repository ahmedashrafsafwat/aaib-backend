/**
 * This is a service that simulates a proxy server just like an NGINX for example
 */
const app  = require('./server.factory')('Gateway',process.env.PROXY_PORT,true);

module.exports = app;