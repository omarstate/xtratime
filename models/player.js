const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  playerId: String,
  teamId: String,
  name: String,
  team: String,
  sport: String,
  strThumb: String,
  strCutout: String,
  nationality: String,
  dateOfBirth: Date,
  status: String,
  gender: String,
  position: String,
  relevance: Number
});

const Player = mongoose.model('Player', playerSchema);

module.exports = {Player};