import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { alpha } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import StarIcon from '@mui/icons-material/Star';
import TopPlayerCard from '../components/TopPlayerCard';

// Top Leagues Section Component
const TopLeagues = () => {
  const leagues = [
    { id: 'premier-league', name: 'Premier League', logo: '/assets/leagues/premier-league.svg', isActive: true },
    { id: 'la-liga', name: 'La Liga', logo: '/assets/leagues/la-liga.svg' },
    { id: 'champions-league', name: 'Champions League', logo: '/assets/leagues/champions-league.svg' },
    { id: 'bundesliga', name: 'Bundesliga', logo: '/assets/leagues/bundesliga.svg' },
  ];

  const topPlayer = {
    name: 'Lewandowski - Barcelona',
    image: '/assets/players/lewandowski.png',
  };

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        p: 2,
        borderRadius: 4,
        bgcolor: '#FF4500',
        color: 'white',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <Typography variant="h3" sx={{ fontWeight: 700, flex: 1 }}>
        Top Leagues
      </Typography>
      {leagues.map((league) => (
        <Paper
          key={league.id}
          elevation={0}
          sx={{
            p: 2,
            borderRadius: 3,
            bgcolor: league.isActive ? 'white' : alpha('white', 0.9),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 100,
            height: 100,
          }}
        >
          <img src={league.logo} alt={league.name} style={{ width: '70%', height: '70%', objectFit: 'contain' }} />
        </Paper>
      ))}
      <Box
        sx={{
          position: 'absolute',
          right: -50,
          top: -50,
          transform: 'rotate(0deg)',
          transformOrigin: 'bottom left',
          zIndex: 2,
        }}
      >
        <TopPlayerCard player={topPlayer} />
      </Box>
    </Box>
  );
};

// Match Result Card Component
const MatchResult = ({ homeTeam, awayTeam, homeScore, awayScore, minute }) => (
  <Paper
    sx={{
      p: 3,
      borderRadius: 3,
      bgcolor: '#000',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
    }}
  >
    <Typography variant="h2" sx={{ color: '#FFFF00', textAlign: 'center', fontWeight: 700 }}>
      {homeScore}:{awayScore}
    </Typography>
    <Typography variant="caption" sx={{ textAlign: 'center', opacity: 0.7 }}>
      {minute}'
    </Typography>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
      <Box sx={{ textAlign: 'center', flex: 1 }}>
        <img src={homeTeam.logo} alt={homeTeam.name} style={{ width: 60, height: 60 }} />
        <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: 500 }}>
          {homeTeam.name}
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          {homeScore}
        </Typography>
      </Box>
      <Box sx={{ textAlign: 'center', flex: 1 }}>
        <img src={awayTeam.logo} alt={awayTeam.name} style={{ width: 60, height: 60 }} />
        <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: 500 }}>
          {awayTeam.name}
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          {awayScore}
        </Typography>
      </Box>
    </Box>
  </Paper>
);

// League Table Component
const LeagueTable = () => {
  const rows = [
    { position: 1, team: 'Liverpool', played: 11, gd: '+15', points: 28, logo: '/assets/teams/liverpool.svg' },
    { position: 2, team: 'Manchester City', played: 11, gd: '+9', points: 23, logo: '/assets/teams/manchester-city.svg' },
    { position: 3, team: 'Chelsea', played: 11, gd: '+8', points: 19, logo: '/assets/teams/chelsea.svg' },
    { position: 4, team: 'Arsenal', played: 11, gd: '+6', points: 19, logo: '/assets/teams/arsenal.svg' },
    { position: 5, team: 'Nottingham Forest', played: 11, gd: '+5', points: 19, logo: '/assets/teams/nottingham-forest.svg' },
    { position: 6, team: 'Brighton', played: 11, gd: '+4', points: 19, logo: '/assets/teams/brighton.svg' },
    { position: 7, team: 'Fulham', played: 11, gd: '+3', points: 18, logo: '/assets/teams/fulham.svg' },
  ];

  return (
    <Paper sx={{ p: 2, borderRadius: 3, bgcolor: '#000', color: 'white' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ flex: 1 }}>Premier League Table</Typography>
        <Typography variant="h5">A</Typography>
      </Box>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: 'white', width: 30 }}>#</TableCell>
              <TableCell sx={{ color: 'white' }}>Team</TableCell>
              <TableCell align="right" sx={{ color: 'white', width: 30 }}>P</TableCell>
              <TableCell align="right" sx={{ color: 'white', width: 50 }}>GD</TableCell>
              <TableCell align="right" sx={{ color: 'white', width: 50 }}>PTS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.position}>
                <TableCell sx={{ color: 'white' }}>{row.position}</TableCell>
                <TableCell sx={{ color: 'white' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <img src={row.logo} alt={row.team} style={{ width: 20, height: 20 }} />
                    {row.team}
                  </Box>
                </TableCell>
                <TableCell align="right" sx={{ color: 'white' }}>{row.played}</TableCell>
                <TableCell align="right" sx={{ color: 'white' }}>{row.gd}</TableCell>
                <TableCell align="right" sx={{ color: 'white' }}>{row.points}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

// Top Scorers Component
const TopScorers = () => {
  const scorers = [
    { name: 'Mohammed Salah', goals: 31, image: '/assets/players/salah.png' },
    { name: 'Erling Haaland', goals: 28, image: '/assets/players/haaland.png' },
    { name: 'Harry Kane', goals: 26, image: '/assets/players/kane.png' },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ color: 'white', mb: 2 }}>Top Scorers</Typography>
      {scorers.map((scorer, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mb: 2,
          }}
        >
          <Avatar src={scorer.image} sx={{ width: 50, height: 50 }} />
          <Typography variant="subtitle1" sx={{ color: 'white', flex: 1 }}>
            {scorer.name}
          </Typography>
          <Typography variant="h6" sx={{ color: 'white' }}>
            {scorer.goals}
          </Typography>
          <StarIcon sx={{ color: 'white' }} />
        </Box>
      ))}
    </Box>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  return (
    <Box sx={{ p: 3, bgcolor: '#111', minHeight: '100vh', width: '100%' }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TopLeagues />
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Box sx={{ flex: 2 }}>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 3,
                  bgcolor: '#000',
                  color: 'white',
                  height: '100%',
                }}
              >
                <Typography variant="h4" sx={{ mb: 3 }}>Premier League</Typography>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <MatchResult
                      homeTeam={{ name: 'Liverpool', logo: '/assets/teams/liverpool.svg' }}
                      awayTeam={{ name: 'Man.City', logo: '/assets/teams/manchester-city.svg' }}
                      homeScore={4}
                      awayScore={1}
                      minute={90}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <MatchResult
                      homeTeam={{ name: 'Man.United', logo: '/assets/teams/manchester-united.svg' }}
                      awayTeam={{ name: 'Chelsea', logo: '/assets/teams/chelsea.svg' }}
                      homeScore={4}
                      awayScore={5}
                      minute={79}
                    />
                  </Grid>
                </Grid>
                <TopScorers />
              </Paper>
            </Box>
            <Box sx={{ width: 400 }}>
              <LeagueTable />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 