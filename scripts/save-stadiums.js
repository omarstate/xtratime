const axios = require('axios');
const mongoose = require('mongoose');
const Stadium = require('../models/stadium');

mongoose.connect('mongodb://localhost/xtratime')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('DB connection failed:', err));

async function fetchAndSaveStadiums(searchTerm) {
  const {data} = await axios.get(`https://www.thesportsdb.com/api/v1/json/123/searchvenues.php?p=${searchTerm}`);
  // check if stadium already exists
  if (!data.venue) return console.log('No Stadiums found.');
  // save stadium
  for (const p of data.venue) {
    const stadium = new Stadium({
      idVenue: p.idVenue,
      idDupe: p.idDupe,
      strVenue: p.strVenue,
      strVenueAlternate: p.strVenueAlternate,
      strVenueSponsor: p.strVenueSponsor,
      strSport: p.strSport,
      strDescriptionEN: p.strDescriptionEN,
      strCost: p.strCost,
      strCountry: p.strCountry,
      strLocation: p.strLocation,
      intFormedYear: p.intFormedYear,
      strFanart1: p.strFanart1,
      strFanart2: p.strFanart2,
      strFanart3: p.strFanart3,
      strFanart4: p.strFanart4,
      strThumb: p.strThumb,
      strMap: p.strMap
    });

    await stadium.save();
    console.log(`Saved: ${stadium.strVenue}`);

}

}

fetchAndSaveStadiums("Wembley");