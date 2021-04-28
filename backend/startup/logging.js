const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");

module.exports = function () {
  //Log exceptions to the uncaughtExceptions.log file if there are uncaught excpetions
  winston.exceptions.handle(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: "uncaughtExceptions.log" })
  );

  //Throw an excpetions if there are unhandled promise rejections
  process.on("unhandledRejection", (ex, promise) => {
    throw (ex, promise);
  });

  //Create a logfile and a Database collection for logging errors
  winston.add(new winston.transports.File({ filename: "logfile.log" }));
  winston.add(
    new winston.transports.MongoDB({
      db: "mongodb://localhost/e-voting-system",
      level: "info",
    })
  );
};
