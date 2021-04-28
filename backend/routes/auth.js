const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const { User, validatePassword } = require("../models/user");

//Login to the system
router.post("/", async (req, res) => {
  //Validate the credintials before sending a request to the Database for optimization
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const { validateError } = validatePassword(req.body.password);
  if (validateError) return res.status(400).send(error.details[0].message);

  //Retrieve the user from the Database and check if they exist or not
  const user = await User.findOne({ nationalID: req.body.nationalID });
  if (!user) return res.status(400).send("Invalid National ID or Password.");

  //Compare the password with the hashed password stored in the Database
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send("Invalid National ID or Password.");

  //Generate and send the token
  const token = user.generateAuthToken();
  res.send(token);
});

//Validate the user credintials using the Joi library
function validateUser(req) {
  const schema = Joi.object({
    nationalID: Joi.string().required().length(14),
    password: Joi.string().required().min(5).max(30),
  });
  return schema.validate(req);
}

module.exports = router;
