const users = require('../routes/users');
const auth = require('../routes/auth');
const players = require('../routes/players');
const express = require('express');
const cors = require('cors');

module.exports = function (app){
    app.use(express.json());
    app.use(cors());
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use('/api/players', players);
}