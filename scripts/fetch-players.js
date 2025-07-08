const axios = require('axios');
const mongoose = require('mongoose');
const {Player} = require('../models/player');

mongoose.connect('mongodb+srv://omarstate10:Xtratime2025@cluster0.r6hqo5i.mongodb.net/xtratime?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('DB connection failed:', err));

// Top teams from Premier League (you can modify this list)
const TEAM_IDS = [
  530,
  531
];

const options = {
  method: 'GET',
  url: 'https://api-football-v1.p.rapidapi.com/v3/players/squads',
  headers: {
    'x-rapidapi-key': '75f922d36amshe618242327200fbp1c50eejsnb09dd4612ef5',
    'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
  }
};

async function fetchDataAndSave() {
  try {
    let totalPlayers = 0;
    
    for (const teamId of TEAM_IDS) {
      console.log(`Fetching squad for team ID: ${teamId}...`);
      
      options.params = { team: teamId };
      const response = await axios.request(options);
      
      if (response.data.response[0]?.players) {
        const players = response.data.response[0].players;
        console.log(`Found ${players.length} players in squad`);
        
        for (const playerData of players) {
          const player = new Player({
            id: playerData.id,
            name: playerData.name,
            firstname: playerData.firstname || '',
            lastname: playerData.lastname || '',
            age: playerData.age,
            birth: {
              date: null, // Squad endpoint doesn't provide birth details
              place: null,
              country: null
            },
            nationality: playerData.nationality,
            height: playerData.height || null,
            weight: playerData.weight || null,
            number: playerData.number,
            position: playerData.position,
            photo: playerData.photo
          });
          
          try {
            await player.save();
            console.log(`Saved: ${player.name}`);
            totalPlayers++;
          } catch (err) {
            if (err.code === 11000) {
              console.log(`Player ${player.name} already exists, skipping...`);
            } else {
              console.error(`Error saving player ${player.name}:`, err.message);
            }
          }
        }
      }
      
      // Wait 6 seconds before next request to respect rate limits
      if (teamId !== TEAM_IDS[TEAM_IDS.length - 1]) { // Don't wait after last team
        console.log('Waiting 6 seconds before next request...');
        await new Promise(resolve => setTimeout(resolve, 6000));
      }
    }
    
    console.log(`Finished! Total players saved: ${totalPlayers}`);
  } catch (error) {
    console.error('Error fetching players:', error.message);
    if (error.response) {
      console.error('API response error:', error.response.data);
    }
  } finally {
    mongoose.disconnect();
  }
}

fetchDataAndSave();


  