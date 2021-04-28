const config = require("config");

//Exit the application if the JsonWebtToken encoding key is not defined
module.exports = function () {
  if (!config.get("jwtPrivateKey"))
    throw new Error("FATAL ERROR: jwtPrivateKey is not defined.");
  else if (!config.get("password"))
    throw new Error("FATAL ERROR: password is not defined.");
};
