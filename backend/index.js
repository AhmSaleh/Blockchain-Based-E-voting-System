const express = require("express");
const app = express();
const winston = require("winston");

require("./startup/logging")();
require("./startup/config")();
require("./startup/routes")(app);
require("./startup/db")();

//throw(new Error('lol'));

const port = process.env.PORT || "3000";

app.listen(port, () => winston.info(`Listening on port: ${port}`));
