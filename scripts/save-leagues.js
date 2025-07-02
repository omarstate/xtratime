const axios = require('axios');
const mongoose = require('mongoose');
const {League} = require('../models/league');

mongoose.connect('mongodb://localhost/xtratime')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('DB connection failed:', err));

async function fetchAndSaveLeagues(id) {
  const { data } = await axios.get(`https://www.thesportsdb.com/api/v1/json/123/lookupleague.php?id=${id}`);
  
  if (!data.leagues) return console.log('No Leagues found.');

  let exists = await League.findOne({idLeague: data.leagues[0].idLeague});
  if (exists) return console.log('League already exists');

    let league = data.leagues[0];

     league = new League({
        idLeague: league.idLeague,
        idAPIfootball: league.idAPIfootball,
        strLeague: league.strLeague,
        strCountry: league.strCountry,
        strCurrentSeason: league.strCurrentSeason,
        strWebsite: league.strWebsite,
        strFacebook: league.strFacebook,
        strTwitter: league.strTwitter,
        strInstagram: league.strInstagram,
        strYoutube: league.strYoutube,
        strDescriptionEN: league.strDescriptionEN,
        strFanart1: league.strFanart1,
        strFanart2: league.strFanart2,
        strFanart3: league.strFanart3,
        strFanart4: league.strFanart4,
        strPoster: league.strPoster,
        strBanner: league.strBanner,
        strBadge: league.strBadge,
        strLogo: league.strLogo,
        strTrophy: league.strTrophy,
        strNaming: league.strNaming,
        strComplete: league.strComplete
    });

    await league.save();
    console.log(`Saved: ${league.strLeague}`);
  }


fetchAndSaveLeagues("4328");
