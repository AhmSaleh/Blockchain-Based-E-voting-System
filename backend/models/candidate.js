const mongoose = require("mongoose");
const Joi = require("joi");

const candidateSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: true,
  },
  symbol: String,
  photo: String,
  votesInLatestElection: Number,
  index: Number,
  description: {
    type: String,
    minlength: 5,
    maxlength: 400,
    required: true,
  },
});

const Candidate = mongoose.model("Candidate", candidateSchema);

exports.Candidate = Candidate;
exports.candidateSchema = candidateSchema;
