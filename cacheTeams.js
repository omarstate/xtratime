require('dotenv').config();
const axios = require('axios');
const mongoose = require('mongoose');
const {Team} = require('./models/team');

// Utility function to add delay between requests
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Rate limiting configuration - 30 requests per minute
const RATE_LIMIT = {
  requestsPerMinute: 30,
  delayBetweenRequests: Math.ceil(60000 / 30), // ~2000ms between requests to stay under 30/min
  requestCount: 0,
  lastResetTime: Date.now()
};

// Utility function for retrying failed requests
async function retryRequest(fn, retries = 3, delayMs = 10000) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (error.response?.status === 429 || error.response?.status === 403) {
        console.log(`Rate limited! Waiting ${delayMs/1000} seconds before retry ${i + 1}/${retries}`);
        await delay(delayMs);
        // Increase delay for next retry
        delayMs *= 2;
        continue;
      }
      throw error;
    }
  }
  throw new Error(`Failed after ${retries} retries`);
}

async function fetchWithRateLimit(url) {
  // Check if we need to reset the counter
  const now = Date.now();
  if (now - RATE_LIMIT.lastResetTime >= 60000) {
    RATE_LIMIT.requestCount = 0;
    RATE_LIMIT.lastResetTime = now;
  }

  // If we're at the limit, wait until the next minute starts
  if (RATE_LIMIT.requestCount >= RATE_LIMIT.requestsPerMinute) {
    const waitTime = 60000 - (now - RATE_LIMIT.lastResetTime);
    console.log(`📊 Rate limit reached. Waiting ${Math.ceil(waitTime/1000)} seconds for next window...`);
    await delay(waitTime);
    RATE_LIMIT.requestCount = 0;
    RATE_LIMIT.lastResetTime = Date.now();
  }

  // Add delay between requests and increment counter
  await delay(RATE_LIMIT.delayBetweenRequests);
  RATE_LIMIT.requestCount++;
  console.log(`📊 API Requests this minute: ${RATE_LIMIT.requestCount}/${RATE_LIMIT.requestsPerMinute}`);
  
  return axios.get(url);
}


async function main() {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log('✅ Connected to MongoDB');
  
      const leagues = ['Spanish La Liga', 'English Premier League', 'Italian Serie A', 'German Bundesliga', 'French Ligue 1'];
  
      for (const league of leagues) {
        console.log(`🔍 Fetching teams for league ${league}`)
        const teamRes = await retryRequest(() => 
          fetchWithRateLimit(`https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=${league}`)
        );
        
        const teams = teamRes.data.teams;
        for (const team of teams) {
          // Check if team already exists in database
          const existingTeam = await Team.findOne({ idTeam: team.idTeam });
          
          if (existingTeam) {
            console.log(`⏩ Skipping ${team.strTeam} - already in database`);
            continue;
          }

          console.log(`🔍 Fetching data for team: ${team.strTeam}`);
          const teamInfo = await retryRequest(() => 
            fetchWithRateLimit(`https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=${team.strTeam}`)
          );
          const teamInfoData = teamInfo.data.teams[0];
          const newTeam = new Team({
            idTeam: teamInfoData.idTeam,
            idAPIfootball: teamInfoData.idAPIfootball,
            strTeam: teamInfoData.strTeam,
            strTeamAlternate: teamInfoData.strTeamAlternate,
            strTeamShort: teamInfoData.strTeamShort,
            intFormedYear: teamInfoData.intFormedYear,
            strSport: teamInfoData.strSport,
            strLeague: teamInfoData.strLeague,
            idLeague: teamInfoData.idLeague,
            strLeague2: teamInfoData.strLeague2,
            idLeague2: teamInfoData.idLeague2,
            strLeague3: teamInfoData.strLeague3,
            idLeague3: teamInfoData.idLeague3,
            strLeague4: teamInfoData.strLeague4,
            idLeague4: teamInfoData.idLeague4,
            strLeague5: teamInfoData.strLeague5,
            idLeague5: teamInfoData.idLeague5,
            strLeague6: teamInfoData.strLeague6,
            idLeague6: teamInfoData.idLeague6,
            strLeague7: teamInfoData.strLeague7,
            idLeague7: teamInfoData.idLeague7,
            strStadium: teamInfoData.strStadium,
            idVenue: teamInfoData.idVenue,
            strLocation: teamInfoData.strLocation,
            intStadiumCapacity: teamInfoData.intStadiumCapacity,
            strWebsite: teamInfoData.strWebsite,
            strFacebook: teamInfoData.strFacebook,
            strTwitter: teamInfoData.strTwitter,
            strInstagram: teamInfoData.strInstagram,
            strYoutube: teamInfoData.strYoutube,
            strRSS: teamInfoData.strRSS,
            strDescriptionEN: teamInfoData.strDescriptionEN,
            strBadge: teamInfoData.strBadge,
            strLogo: teamInfoData.strLogo,
            strFanart1: teamInfoData.strFanart1,
            strFanart2: teamInfoData.strFanart2,
            strFanart3: teamInfoData.strFanart3,
            strFanart4: teamInfoData.strFanart4,
            strBanner: teamInfoData.strBanner,
            strEquipment: teamInfoData.strEquipment,
            strColour1: teamInfoData.strColour1,
            strColour2: teamInfoData.strColour2,
            strColour3: teamInfoData.strColour3,
            strGender: teamInfoData.strGender,
            strCountry: teamInfoData.strCountry,
            strKeywords: teamInfoData.strKeywords,
            strLocked: teamInfoData.strLocked
          });

          // Save new team
          await newTeam.save();
          console.log(`✅ Saved new team: ${teamInfoData.strTeam}`);
        }
      }
    } catch (error) {
      console.error('❌ Fatal error:', error.message);
    } finally {
      await mongoose.disconnect();
      console.log('📡 Disconnected from MongoDB');
    }
}
  
main();
