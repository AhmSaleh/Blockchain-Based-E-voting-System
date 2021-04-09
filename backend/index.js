const express = require('express');
const app = express();
const mongoose = require('mongoose');
const users = require('./routes/users');
const candidates = require('./routes/candidates');
const elections = require('./routes/elections');
const Joi = require('joi');

//Joi.objectId = require('joi-objectid')(Joi);

mongoose.connect('mongodb://localhost/e-voting-system', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Connected to the Database successfully!'))
.catch(() => console.error('Failed to connect to the Database'));

app.use(express.json());
app.use('/api/users' , users);
app.use('/api/candidates', candidates);
app.use('/api/elections', elections);

const port = process.env.PORT || '3000';

app.listen(port, () => console.log(`Listening on port: ${port}`));