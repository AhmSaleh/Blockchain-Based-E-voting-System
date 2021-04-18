const express = require('express');
const users = require('../routes/users');
const candidates = require('../routes/candidates');
const elections = require('../routes/elections');
const auth = require('../routes/auth');
const error = require('../middleware/error');
const cors = require('cors');

module.exports = function(app) {
    app.use(cors());
    app.use(express.json());
    app.use('/api/users' , users);
    app.use('/api/candidates', candidates);
    app.use('/api/elections', elections);
    app.use('/api/auth', auth);
    app.use(error);
}
