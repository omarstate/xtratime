require('dotenv').config();
const axios = require('axios');
const mongoose = require('mongoose');
const {Player} = require('./models/player');

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

    const leagues = ['Spanish La Liga', 'English Premier League'];

    for (const league of leagues) {
      console.log(`🔍 Fetching teams for league ${league}`);
      const teamRes = await retryRequest(() => 
        fetchWithRateLimit(`https://www.thesportsdb.com/api/v1/json/123/search_all_teams.php?l=${league}`)
      );
      
      const teams = teamRes.data.teams;
      for (const team of teams) {
        console.log(`🔍 Fetching players for team ${team.strTeam}`);
        
        try {
          const players = await retryRequest(() =>
            fetchWithRateLimit(`https://www.thesportsdb.com/api/v1/json/123/lookup_all_players.php?id=${team.idTeam}`)
          );

          for (let player of players.data.player || []) {
            try {
              console.log(`📝 Processing player: ${player.strPlayer}`);
              const playerData = await retryRequest(() =>
                fetchWithRateLimit(`https://www.thesportsdb.com/api/v1/json/123/lookupplayer.php?id=${player.idPlayer}`)
              );

              const playerInfo = playerData.data.players[0];
              if (!playerInfo) {
                console.log(`⚠️ No data found for player ${player.strPlayer}, skipping...`);
                continue;
              }

              const newPlayer = new Player({
                idPlayer: playerInfo.idPlayer,
                idTeam: playerInfo.idTeam,
                idTeam2: playerInfo.idTeam2,
                idAPIfootball: playerInfo.idAPIfootball,
                idWikidata: playerInfo.idWikidata,
                idTransferMkt: playerInfo.idTransferMkt,
                strPlayer: playerInfo.strPlayer,
                strTeam: playerInfo.strTeam,
                strPosition: playerInfo.strPosition,
                strCutout: playerInfo.strCutout,
                strNumber: playerInfo.strNumber,
                strSigning: playerInfo.strSigning,
                strBirthLocation: playerInfo.strBirthLocation,
                strEthnicity: playerInfo.strEthnicity,
                strStatus: playerInfo.strStatus,
                strDescriptionEN: playerInfo.strDescriptionEN,
                strGender: playerInfo.strGender,
                strFacebook: playerInfo.strFacebook,
                strTwitter: playerInfo.strTwitter,
                strInstagram: playerInfo.strInstagram,
                strHeight: playerInfo.strHeight,
                strWeight: playerInfo.strWeight,
                dateBorn: playerInfo.dateBorn,
                team: team.strTeam,
                sport: 'football',
                strThumb: playerInfo.strThumb,
                strCutout: playerInfo.strCutout,
                strRender: playerInfo.strRender,
                strNationality: playerInfo.strNationality,
                status: playerInfo.status,
                gender: playerInfo.gender,
              });

              await newPlayer.save();
              console.log(`✅ Saved player: ${playerInfo.strPlayer}`);
            } catch (error) {
              console.error(`❌ Error processing player ${player.strPlayer}:`, error.message);
              continue; // Skip this player and continue with the next one
            }
          }
        } catch (error) {
          console.error(`❌ Error fetching players for team ${team.strTeam}:`, error.message);
          continue; // Skip this team and continue with the next one
        }
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