const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Election } = require("../models/election");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

//When an election has ended it post it to the Database
router.post("/", [auth, admin], async (req, res) => {
  const election = new Election({
    candidateWinner: req.body.candidateWinner,
    candidateWinnerVotes: req.body.candidateWinnerVotes,
    totalVotes: req.body.totalVotes,
    name: req.body.name,
    candidates: req.body.candidates,
  });

  await election.save();
  res.send(election);
});

//Get get a certain election from the Database when the user selects it
router.get("/:id", auth, async (req, res) => {
  const election = await Election.findById(req.params.id);
  if (!election)
    return res.status(404).send("Election with the given ID was not found");
  res.send(election);
});

//Get all elections from the Database
router.get("/", auth, async (req, res) => {
  const election = await Election.find().sort({ startDate: -1 });
  if (!election) return res.status(404).send("No Elections were found");
  res.send(election);
});

module.exports = router;
