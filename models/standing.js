const mongoose = require('mongoose');

const standingSchema = new mongoose.Schema({
  league: { type: String, required: true },
  team: { type: String, required: true },
  played: { type: Number, required: true },
  won: { type: Number, required: true },
  drawn: { type: Number, required: true },
  lost: { type: Number, required: true },
  goalsFor: { type: Number, required: true },
  goalsAgainst: { type: Number, required: true },
  goalDifference: { type: Number, required: true },
  points: { type: Number, required: true }
});

const Standing = mongoose.model('Standing', standingSchema);

module.exports = { Standing }; 