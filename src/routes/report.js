const routes = require("express").Router();

const requestController = require('../controller/report_controller')

/**
 *  Allows the spam protection team to block a source from the users
 */
routes.put("/block/:reportId", async (req, res, next) => {
  await requestController.updateTicket(req, res, "BLOCKED");
});

/**
 *  Allows the spam protection team to resolve a ticket
 */
routes.put("/:reportId", async (req, res, next) => {
  await requestController.updateTicket(req, res,"RESOLVED");
});


/**
 * Returns all the reports
 */
routes.get("/", async (req, res, next) => {
  await requestController.getReports(req, res);
});



module.exports = routes;