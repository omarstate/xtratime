const {Player} = require('../models/player');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const axios = require('axios');

// Get all players
router.get('/', async (req, res) => {
  try {
    const players = await mongoose.connection.db
      .collection('players')
      .find({})
      .toArray();

    console.log('RAW players:', players);
    res.send(players);
  } catch (err) {
    console.error('Raw query error:', err);
    res.status(500).send('Server error');
  }
});

// Get players by team name
router.get('/team/:teamName', async (req, res) => {
  try {
    const teamName = req.params.teamName;
    console.log('Fetching players for team:', teamName);
    
    const players = await mongoose.connection.db
      .collection('players')
      .find({
        $or: [
          { strTeam: { $regex: teamName, $options: 'i' } },
          { team: { $regex: teamName, $options: 'i' } }
        ]
      })
      .toArray();

    console.log(`Found ${players.length} players for team "${teamName}"`);
    res.send(players);
  } catch (err) {
    console.error('Error fetching players by team:', err);
    res.status(500).send('Error fetching players by team');
  }
});

// Add a new player from TheSportsDB API
router.post('/playerName/:playerName', async (req, res) => {
  try {
    const response = await axios.get(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${req.params.playerName}`);
    
    if (!response.data.player) {
      return res.status(400).send("No Player Found!");
    }

    const apiPlayer = response.data.player[0];
    console.log('API Player data:', apiPlayer);

    const newPlayer = new Player({
      // Map all fields from the API response to our model
      idPlayer: apiPlayer.idPlayer,
      idTeam: apiPlayer.idTeam,
      idTeam2: apiPlayer.idTeam2,
      idAPIfootball: apiPlayer.idAPIfootball,
      idWikidata: apiPlayer.idWikidata,
      idTransferMkt: apiPlayer.idTransferMkt,
      strPlayer: apiPlayer.strPlayer,
      strTeam: apiPlayer.strTeam,
      team: apiPlayer.strTeam, // Duplicate for compatibility
      strPosition: apiPlayer.strPosition,
      strCutout: apiPlayer.strCutout,
      strNumber: apiPlayer.strNumber,
      strSigning: apiPlayer.strSigning,
      strBirthLocation: apiPlayer.strBirthLocation,
      strEthnicity: apiPlayer.strEthnicity,
      strStatus: apiPlayer.strStatus,
      status: apiPlayer.strStatus, // Duplicate for compatibility
      strDescriptionEN: apiPlayer.strDescriptionEN,
      strGender: apiPlayer.strGender,
      gender: apiPlayer.strGender, // Duplicate for compatibility
      strFacebook: apiPlayer.strFacebook,
      strTwitter: apiPlayer.strTwitter,
      strInstagram: apiPlayer.strInstagram,
      strHeight: apiPlayer.strHeight,
      strWeight: apiPlayer.strWeight,
      dateBorn: apiPlayer.dateBorn ? new Date(apiPlayer.dateBorn) : null,
      sport: apiPlayer.strSport || 'Soccer',
      strThumb: apiPlayer.strThumb,
      strRender: apiPlayer.strRender,
      strNationality: apiPlayer.strNationality
    });

    await newPlayer.save();

    console.log('Created new player:', newPlayer.strPlayer);
    res.status(200).send({
      message: 'Player created successfully',
      player: newPlayer
    });

  } catch (err) {
    console.error('Error creating player:', err);
    res.status(500).send({
      message: 'Error creating player',
      error: err.message
    });
  }
});

module.exports = router;