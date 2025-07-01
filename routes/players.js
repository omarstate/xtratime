const {Player} = require('../models/player');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const players = await Player.find();
    res.send(players);
});

module.exports = router;