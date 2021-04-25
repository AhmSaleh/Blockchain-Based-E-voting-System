const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validateUser, validatePassword } = require("../models/user");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

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

router.put("/", async (req, res) => {
  const { error } = validatePassword(req.body.password);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ nationalID: req.body.nationalID }).select({
    isRegistered: 1,
  });
  if (!user)
    return res
      .status(404)
      .send("User with the given National ID was not found");
  else if (user.isRegistered)
    return res.status(400).send("User already registered");

  const salt = await bcrypt.genSalt(10);
  user.isRegistered = true;
  user.password = await bcrypt.hash(req.body.password, salt);
  //user.isAdmin = true;

  await user.save();
  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send(_.pick(user, ["_id"]));
});

module.exports = router;
