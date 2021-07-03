const mongoose = require("mongoose");
const Joi = require("joi");
const { number } = require("joi");
const { Candidate, candidateSchema } = require("./candidate");

const Election = mongoose.model(
  "Election",
  new mongoose.Schema({
    candidateWinner: {
      type: candidateSchema
    },
    candidateWinnerVotes: Number,
    endDate: {
      type: Date,
      default: Date.now(),
    },
    totalVotes: {
      type: Number,
      min: 0,
    },
    candidates: {
      type: [candidateSchema],
      required: true,
    }
  })
);

exports.Election = Election;
