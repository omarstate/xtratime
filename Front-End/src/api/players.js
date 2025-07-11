import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api'; // Update this with your backend URL

export const fetchPlayers = async () => {
  try {
    console.log('Fetching players from:', `${API_BASE_URL}/players`);
    const response = await axios.get(`${API_BASE_URL}/players`);
    console.log('Players data received:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    throw error;
  }
};

export const fetchPlayersByTeam = async (teamName) => {
  try {
    console.log('Fetching players for team:', teamName);
    const response = await axios.get(`${API_BASE_URL}/players/team/${encodeURIComponent(teamName)}`);
    console.log('Team players data received:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching players by team:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    throw error;
  }
};

export const fetchLeagues = async () => {
  try {
    console.log('Fetching leagues from:', `${API_BASE_URL}/leagues`);
    const response = await axios.get(`${API_BASE_URL}/leagues`);
    console.log('Leagues data received:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    throw error;
  }
}; 