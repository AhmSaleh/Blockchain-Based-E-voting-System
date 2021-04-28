const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Candidate } = require("../models/candidate");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

//Add a Candidate to the election
router.post("/", [auth, admin], async (req, res) => {
  const user = new Candidate({
    name: req.body.name,
  });
  await user.save();
  res.send(user);
});

//Remove a certain Candidate from the election
router.delete("/:id", [auth, admin], async (req, res) => {
  const user = await Candidate.findByIdAndDelete({ _id: id });
  if (!user)
    return res
      .status(404)
      .send("User with the given National ID was not found");
  res.send(user);
});

//Get all candidates from the Database
router.get("/", auth, async (req, res) => {
  const candidates = await Candidate.find().select("name -_id");
  if (!candidates) return res.status(404).send("No candidates exist");
  res.send(candidates);
});
module.exports = router;
