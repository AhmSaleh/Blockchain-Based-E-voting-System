const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Candidate } = require("../models/candidate");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

//Add a Candidate to the election
router.post("/", [auth, admin], async (req, res) => {
  let index;
  const finalCandidate = await Candidate.findOne().sort({ _id: -1 });
  if (!finalCandidate) index = 0;
  else index = finalCandidate.index + 1;
  const user = new Candidate({
    name: req.body.name,
    symbol: req.body.symbol,
    photo: req.body.photo,
    index: index,
  });
  await user.save();
  res.send(user);
});

//Remove a certain Candidate from the election
router.delete("/:id", [auth, admin], async (req, res) => {
  const user = await Candidate.findByIdAndDelete({ _id: req.params.id });
  if (!user)
    return res
      .status(404)
      .send("User with the given National ID was not found");
  res.send(user);
});

//Get all candidates from the Database
router.get("/", async (req, res) => {
  const candidates = await Candidate.find();
  if (!candidates) return res.status(404).send("No candidates exist");
  //console.log(candidates);
  res.send(candidates);
});
module.exports = router;
