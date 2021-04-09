const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Election } = require('../models/election');
//const { Candidate } = require('../models/candidate');

router.post('/', async (req, res) => {
    const election = new Election({
        candidateWinner: req.body.candidateID,
        candidateWinnerVotes: req.body.candidateWinnerVotes,
        startDate: req.body.startDate,
        totalVotes: req.body.totalVotes,
        candidates: req.body.candidates
    });

    await election.save();
    res.send(election);
});

router.get('/:id', async( req, res) => {
    const election = await Election.findById(req.params.id);
    if(!election) return res.status(404).send('Election with the given ID was not found');
    res.send(election);
});

router.get('/', async( req, res) => {
    const election = await Election.find().sort({startDate: -1});
    if(!election) return res.status(404).send('No Elections were found');
    res.send(election);
});
module.exports = router;