const express = require('express');
const {Stadium} = require('../models/stadium');
const router = express.Router();

router.get('/', async (req, res) => {
    const stadiums = await Stadium.find({});
    res.send(stadiums);
});

module.exports = router;