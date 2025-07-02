const {Player} = require('../models/player');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const players = await Player.find().sort({team: 1});
    res.send(players);
});

module.exports = router;