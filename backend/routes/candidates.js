const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Candidate } = require('../models/candidate');

router.post('/', async (req, res) => {
    const user = new Candidate({
        name: req.body.name,
    });

    await user.save();
    res.send(user);
});

router.delete('/:id', async( req, res) => {
    const user = await Candidate.findByIdAndDelete({ _id: id });
    if(!user) return res.status(404).send('User with the given National ID was not found');
    res.send(user);
});
module.exports = router;
