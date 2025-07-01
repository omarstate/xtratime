const axios = require('axios');
const mongoose = require('mongoose');
const {Player} = require('./models/player');

mongoose.connect('mongodb://localhost/xtratime')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('DB connection failed:', err));

async function fetchAndSavePlayers(searchTerm) {
  const { data } = await axios.get(`https://www.thesportsdb.com/api/v1/json/123/searchplayers.php?p=${searchTerm}`);
  
  if (!data.player) return console.log('No players found.');

  for (const p of data.player) {
    const player = new Player({
      playerId: p.idPlayer,
      teamId: p.idTeam,
      name: p.strPlayer,
      team: p.strTeam,
      sport: p.strSport,
      strThumb: p.strThumb,
      strCutout: p.strCutout,
      nationality: p.strNationality,
      dateOfBirth: p.dateBorn,
      status: p.strStatus,
      gender: p.strGender,
      position: p.strPosition,
      relevance: parseFloat(p.relevance)
    });

    await player.save();
    console.log(`Saved: ${player.name}`);
  }
}

fetchAndSavePlayers("Mohamed Salah"); 