const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  idPlayer: String,
  idTeam: String,
  idTeam2: String,
  idAPIfootball: String,
  idWikidata: String,
  idTransferMkt: String,
  strPlayer: String,
  strTeam: String,
  strPosition: String,
  strCutout: String,
  strNumber: String,
  strSigning: String,
  strBirthLocation: String,
  strEthnicity: String,
  strStatus: String,
  strDescriptionEN: String,
  strGender: String,
  strFacebook: String,
  strTwitter: String,
  strInstagram: String,
  strHeight: String,
  strWeight: String,
  dateBorn: Date,
  team: String,
  sport: String,
  strThumb: String,
  strCutout: String,
  strRender: String,
  strNationality: String,
  status: String,
  gender: String,
});

const Player = mongoose.model('Player', playerSchema);

module.exports = {Player};