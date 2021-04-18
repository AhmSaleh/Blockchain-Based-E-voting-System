const mongoose = require('mongoose');
const Joi = require('joi');

const candidateSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true
    },
    symbol: {
        type: new mongoose.Schema({
            name: String,
            image: Buffer
        })
    },
    photo: {
        type: new mongoose.Schema({
            name: String,
            image: Buffer
        })
    },
    votesInLatestElection: Number
});

const Candidate = mongoose.model('Cadidate', candidateSchema);

exports.Candidate = Candidate;
exports.candidateSchema = candidateSchema