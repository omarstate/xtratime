const users = require('../routes/users');
const auth = require('../routes/auth');
const players = require('../routes/players');
const stadiums = require('../routes/stadiums');
const leagues = require('../routes/leagues');
const matches = require('../routes/matches');
const standings = require('../routes/standings');
const express = require('express');
const cors = require('cors');

module.exports = function (app){
    app.use(express.json());
    app.use(cors());
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use('/api/players', players);
    app.use('/api/stadiums', stadiums);
    app.use('/api/leagues', leagues);
    app.use('/api/matches', matches);
    app.use('/api/standings', standings);
}
