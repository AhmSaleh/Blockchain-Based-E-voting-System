const jwt = require("jsonwebtoken");
const config = require("config");

//Authenticating the user by verifying that they are using a valid token
module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");
  try {
    //Getting the private Key used to encode the token from the configuration
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};
