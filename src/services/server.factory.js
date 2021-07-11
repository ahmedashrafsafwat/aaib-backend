const express = require("express");
var cors = require("cors");
require('../config/config');
const expressValidator = require("express-validator");
const bodyParser = require("body-parser");

// connect to db
require('../models');

// services configs
const services = require('../config/services')

/**
 * Function used to generate an express server for a service and returns the express server factory object
 * serviceName {String} the name of the server
 * port {Number} the port that the server should be initialized at
 * isGateway {Boolean}  to identify if we need also to start the gateway redirecting functions
 */
ServerGenerator = (serviceName, port, isGateway) => {
    // Create express server
    let app = express();

    app.use(cors())

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(expressValidator());

    app.listen(port, () => {
        console.log(`${serviceName} service is running at http://localhost:${port} in ${ app.get("env")} mode`);
    });

    if (isGateway) {
        apiRouting(app)
    }

    return app;
}

apiRouting = (app) => {
    let routeNames = services.map(x => x.path);
    let routesURI = []

    // example routesURI = ['/reports*']
    routeNames.forEach(path => {
        routesURI.push(`/${path}*`)
    })

    /** redirect all get requests */
    app.get(
        routesURI,
        function (req, res) {
            var serviceName = req.originalUrl.split('/')[1]
            serviceRedirects(serviceName, routeNames, req, res)
        }
    );

    /** redirect all put requests */
    app.put(
        routesURI,
        function (req, res) {
            var serviceName = req.originalUrl.split('/')[1]
            serviceRedirects(serviceName, routeNames, req, res)
        }
    );
}


serviceRedirects = (serviceName, routeNames, req, res) => {
    if (routeNames.indexOf(serviceName) > -1) {
        services.forEach(service => {
            if (service.path == serviceName) 
                res.redirect(307, `http://${req.hostname}:${service.port}${req.originalUrl}`);
        })
    } else {
        res.json({
            error: 'Service not found'
        });
        return;
    }
}

module.exports = ServerGenerator;