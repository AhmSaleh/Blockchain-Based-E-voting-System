const winston = require("winston");

//Middleware function that gets called to handle errors resulting from routes
module.exports = function (err, req, res, next) {
  winston.error(err.message, err); //Logging the errors to the Database and the logfile

  res.status(500).send("Something failed.");
};
