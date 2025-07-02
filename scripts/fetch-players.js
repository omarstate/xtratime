const axios = require('axios');
const mongoose = require('mongoose');
const {Player} = require('../models/player');

mongoose.connect('mongodb://localhost/xtratime')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('DB connection failed:', err));

async function fetchAndSavePlayers(searchTerm) {
  const { data } = await axios.get(`https://www.thesportsdb.com/api/v1/json/123/searchplayers.php?p=${searchTerm}`);
  
  if (!data.player) return console.log('No players found.');

  let exists = await Player.findOne({playerId: data.player[0].idPlayer});
  if (exists) return console.log('Player already exists');

    let player = data.player[0];

      player = new Player({
      playerId: player.idPlayer,
      teamId: player.idTeam,
      name: player.strPlayer,
      team: player.strTeam,
      sport: player.strSport,
      strThumb: player.strThumb,
      strCutout: player.strCutout,
      nationality: player.strNationality,
      dateOfBirth: player.dateBorn,
      status: player.strStatus,
      gender: player.strGender,
      position: player.strPosition,
      relevance: parseFloat(player.relevance)
    });

    await player.save();
    console.log(`Saved: ${player.name}`);
  }


fetchAndSavePlayers("Salah"); 