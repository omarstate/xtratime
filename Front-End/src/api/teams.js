import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api'; // Update this with your backend URL

export const fetchTeams = async () => {
  try {
    console.log('Fetching teams from:', `${API_BASE_URL}/teams`);
    const response = await axios.get(`${API_BASE_URL}/teams`);
    console.log('Teams data received:', response.data);
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

export const fetchTeamsByLeague = async (leagueName) => {
  try {
    console.log('Fetching teams by league from:', `${API_BASE_URL}/teams/league/${leagueName}`);
    const response = await axios.get(`${API_BASE_URL}/teams/league/${leagueName}`);
    console.log('Teams data received:', response.data);
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

export const fetchTeamById = async (teamId) => {
  try {
    console.log('Fetching team by ID from:', `${API_BASE_URL}/teams/${teamId}`);
    const response = await axios.get(`${API_BASE_URL}/teams/${teamId}`);
    console.log('Team data received:', response.data);
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
