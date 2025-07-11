const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    idTeam: {
        type: String,
        required: true,
        unique: true
    },
    idAPIfootball: String,
    strTeam: {
        type: String,
        required: true
    },
    strTeamAlternate: String,
    strTeamShort: String,
    intFormedYear: String,
    strSport: {
        type: String,
        default: 'Soccer'
    },
    // League information
    strLeague: String,
    idLeague: String,
    strLeague2: String,
    idLeague2: String,
    strLeague3: String,
    idLeague3: String,
    strLeague4: String,
    idLeague4: String,
    strLeague5: String,
    idLeague5: String,
    strLeague6: String,
    idLeague6: String,
    strLeague7: String,
    idLeague7: String,
    
    // Stadium information
    strStadium: String,
    idVenue: String,
    strLocation: String,
    intStadiumCapacity: String,
    
    // Social and web presence
    strWebsite: String,
    strFacebook: String,
    strTwitter: String,
    strInstagram: String,
    strYoutube: String,
    strRSS: String,
    
    // Team descriptions in different languages
    strDescriptionEN: String,
    
    // Team visual assets
    strBadge: String,
    strLogo: String,
    strFanart1: String,
    strFanart2: String,
    strFanart3: String,
    strFanart4: String,
    strBanner: String,
    strEquipment: String,
    
    // Team colors and metadata
    strColour1: String,
    strColour2: String,
    strColour3: String,
    strGender: {
        type: String,
        enum: ['Male', 'Female', 'Mixed']
    },
    strCountry: String,
    strKeywords: String,
    strLocked: {
        type: String,
        default: 'unlocked'
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

const Team = mongoose.model('Team', teamSchema);

module.exports = { Team };