const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { User, validateUser } = require('../models/user');

router.post('/', async (req, res) => {
    const { error } = validateUser(req.body); 
    if(error) return res.status(400).send(error.message);

    const user = new User({
        nationalID: req.body.nationalID,
        email: req.body.email,
        isRegistered: req.body.isRegistered
    });

    await user.save();
    res.send(user);
});

router.put('/:id', async (req, res) => {
    const user = await User.updateOne({ nationalID: req.params.id }, {
        $set: {
            password: req.body.password
        }
    });
    if(!user) return res.status(404).send('User with the given National ID was not found');

    //const result = await user.save();
    res.send(user);
});

router.get('/:id', async( req, res) => {
    const user = await User.find({ nationalID: req.params.id });
    if(!user) return res.status(404).send('User with the given National ID was not found');
    res.send(user);
});
module.exports = router;
