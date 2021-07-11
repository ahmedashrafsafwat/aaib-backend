const reportsRouter = require("../routes/report");

const app = require('./server.factory')('Reports', process.env.REPORT_SERVICE_PORT);

app.use("/reports", reportsRouter);