const {Player} = require('../models/player');
const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

router.get('/', async (req, res) => {
  try {
    const players = await mongoose.connection.db
      .collection('players') // must match EXACT name in MongoDB Atlas
      .find({})
      .toArray();

    console.log('RAW players:', players); // check terminal
    res.send(players);
  } catch (err) {
    console.error('Raw query error:', err);
    res.status(500).send('Server error');
  }
});

module.exports = router;