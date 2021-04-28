const winston = require("winston");
const mongoose = require("mongoose");

module.exports = function () {
  mongoose.set("useUnifiedTopology", true);
  mongoose
    .connect("mongodb://localhost/e-voting-system", {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    .then(() => winston.info("Connected to the Database successfully!"));
};
