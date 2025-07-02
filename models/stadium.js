const mongoose = require('mongoose');

const stadiumSchema = new mongoose.Schema({
    idVenue: {
    type: String,
  },
  idDupe: {
    type: String
  },
  strVenue: {
    type: String
  },
  strVenueAlternate: {
    type: String
  },
  strVenueSponsor: {
    type: String
  },
  strSport: {
    type: String
  },
  strDescriptionEN: {
    type: String
  },
  strCost: {
    type: String
  },
  strCountry: {
    type: String
  },
  strLocation: {
    type: String
  },
  intFormedYear: {
    type: String
  },
  strFanart1: {
    type: String
  },
  strFanart2: {
    type: String
  },
  strFanart3: {
    type: String
  },
  strFanart4: {
    type: String
  },
  strThumb: {
    type: String
  },
  strMap: {
    type: String
  }

  
});

const Stadium = mongoose.model('Stadium', stadiumSchema);

module.exports = {Stadium};