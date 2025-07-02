const {League} = require('../models/league');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const leagues = await League.find();
    res.send(leagues);
});

router.get('/:id', async (req, res) => {
    const league = await League.findById(req.params.id);
    if (!league) return res.status(404).send('League not found.');
    res.send(league);
});


module.exports = router;