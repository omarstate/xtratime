const mongoose = require('mongoose');
const Joi = require('joi');

const leagueSchema = new mongoose.Schema({
    idLeague: {
        type: String,
        required: true,
        unique: true
    },
    idAPIfootball: {
        type: String,
        required: true,
    },
    strLeague: {
        type: String,
        required: true,
    },
    strCountry: {
        type: String,
        required: true,
    },
    strCurrentSeason: {
        type: String,
        required: true,
    },
    strCurrentSeason: {
        type: String,
        required: true,
    },
    strWebsite: {
        type: String,
        required: true,
    },
    strFacebook: {
        type: String,
        required: true,
    },
    strTwitter: {
        type: String,
    },
    strInstagram: {
        type: String,
    },
    strYoutube: {
        type: String,
    },
    strDescriptionEN: {
        type: String,
    },
    strFanart1: {
        type: String,
    },
    strFanart2: {
        type: String,
    },
    strFanart3: {
        type: String,
    },
    strFanart4: {
        type: String,
    },
    strPoster: {
        type: String,
    },
    strBanner: {
        type: String,
    },
    strBadge: {
        type: String,
    },
    strLogo: {
        type: String,
    },
    strTrophy: {
        type: String,
    },
    strNaming: {
        type: String,
    },
    strComplete: {
        type: String,
    }
});


const League = mongoose.model('League', leagueSchema);

module.exports = {League};