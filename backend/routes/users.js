const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const {
  User,
  validateUser,
  validatePassword,
  parseJwt,
} = require("../models/user");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const nodemailer = require("nodemailer");
const config = require("config");

//Add a user to the Database so that this certain user could register using their national ID
router.post("/", [auth, admin], async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ nationalID: req.body.nationalID });
  if (user) return res.status(400).send("User already exists");

  user = new User({
    nationalID: req.body.nationalID,
    email: req.body.email,
    isRegistered: req.body.isRegistered,
    isAdmin: req.body.isAdmin,
  });

  await user.save();
  res.send(user);
});

//Allow the user to register by looking up their national ID in the Database
router.put("/", async (req, res) => {
  //Check if the password meets the requirements
  const { error } = validatePassword(req.body.password);
  if (error) return res.status(400).send(error.details[0].message);

  //Check if the user exists in the Database and is not already registered
  let user = await User.findOne({ nationalID: req.body.nationalID }).select({
    isRegistered: 1,
    email: 1,
  });
  if (!user)
    return res
      .status(404)
      .send("User with the given National ID was not found");
  else if (user.isRegistered)
    return res.status(400).send("User already registered");

  //Hash the password and change the isRegistered value
  const salt = await bcrypt.genSalt(10);
  user.isRegistered = true;
  user.password = await bcrypt.hash(req.body.password, salt);

  //Save user in the Database and return the authentication token so that the user could use the application
  await user.save();
  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send(_.pick(user, ["_id"]));
});

router.get("/:id", async (req, res) => {
  const user = await User.findOne({ nationalID: req.params.id });
  res.send(user.email);
});

//Change the hasVoted value to true when the user votes in the latest election
router.put("/voted", auth, async (req, res) => {
  const tokenInfo = parseJwt(req.header("x-auth-token"));
  let user = await User.findByIdAndUpdate(
    tokenInfo._id,
    {
      $set: { hasVoted: true },
    },
    { new: true }
  );
  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send(user);
});

//Delete all non-admin users when starting a new election
router.delete("/", [auth, admin], async (req, res) => {
  const user = await User.deleteMany({ isAdmin: false });
  res.send("Success");
});

//Used to send an email to a user for 2FA
router.post("/email", async (req, res) => {
  let transporter = nodemailer.createTransport({
    serivce: "outlook",
    host: "smtp.outlook.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "blockchain_evoting_system@outlook.com",
      pass: config.get("password"),
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "blockchain_evoting_system@outlook.com", // sender address
    to: req.body.email,
    subject: req.body.subject, // Subject line
    text: req.body.text, // plain text body
    html: req.body.html, // html body
  });
  res.send("Success");
});

module.exports = router;
