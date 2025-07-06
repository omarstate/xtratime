const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  homeTeam: { type: String, required: true },
  awayTeam: { type: String, required: true },
  homeScore: { type: Number, required: true },
  awayScore: { type: Number, required: true },
  date: { type: Date, required: true },
  league: { type: String, required: true },
  status: { type: String, enum: ['scheduled', 'live', 'finished'], default: 'scheduled' }
});

const Match = mongoose.model('Match', matchSchema);

module.exports = { Match }; 