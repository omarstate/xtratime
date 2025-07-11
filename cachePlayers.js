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

    const leagues = ['Spanish La Liga', 'English Premier League', 'Italian Serie A', 'German Bundesliga', 'French Ligue 1'];

    for (const league of leagues) {
      console.log(`\n🏆 Processing league: ${league}`);
      const teamRes = await retryRequest(() => 
        fetchWithRateLimit(`https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=${league}`)
      );
      
      if (!teamRes.data.teams) {
        console.error(`❌ No teams found for league: ${league}`);
        continue;
      }

      console.log(`📊 Found ${teamRes.data.teams.length} teams in ${league}`);
      const teams = teamRes.data.teams;

      for (const team of teams) {
        console.log(`\n⚽ Processing team: ${team.strTeam} (ID: ${team.idTeam})`);
        
        try {
          const playersResponse = await retryRequest(() =>
            fetchWithRateLimit(`https://www.thesportsdb.com/api/v1/json/123/lookup_all_players.php?id=${team.idTeam}`)
          );

          if (!playersResponse.data || !playersResponse.data.player) {
            console.log(`⚠️ No players data found for team ${team.strTeam}`);
            continue;
          }

          console.log(`📊 Found ${playersResponse.data.player.length} players for ${team.strTeam}`);

          for (let player of playersResponse.data.player) {
            if (!player.idPlayer) {
              console.log(`⚠️ Invalid player data found, skipping...`);
              continue;
            }

            const existing = await Player.findOne({idPlayer: player.idPlayer});
            if (existing) {
              console.log(`⏩ Skipping ${player.strPlayer} - already in database`);
              continue;
            }

            try {
              console.log(`📝 Processing player: ${player.strPlayer} (ID: ${player.idPlayer})`);
              const playerData = await retryRequest(() =>
                fetchWithRateLimit(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${player.idPlayer}`)
              );

              if (!playerData.data || !playerData.data.players || !playerData.data.players[0]) {
                console.log(`⚠️ No detailed data found for player ${player.strPlayer}, skipping...`);
                continue;
              }

              const playerInfo = playerData.data.players[0];

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
                status: playerInfo.strStatus || 'Active',
                gender: playerInfo.strGender || 'Male',
              });

              await newPlayer.save();
              console.log(`✅ Saved player: ${playerInfo.strPlayer} to ${team.strTeam}`);
            } catch (error) {
              console.error(`❌ Error processing player ${player.strPlayer}:`, error.message);
              continue;
            }
          }
        } catch (error) {
          console.error(`❌ Error fetching players for team ${team.strTeam}:`, error.message);
          if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
          }
          continue;
        }
      }
    }
  } catch (error) {
    console.error('❌ Fatal error:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  } finally {
    await mongoose.disconnect();
    console.log('📡 Disconnected from MongoDB');
  }
}

main();