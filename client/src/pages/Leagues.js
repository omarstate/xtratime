import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { alpha, useTheme } from '@mui/material/styles';
import ContentCard from '../components/ContentCard';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import PublicIcon from '@mui/icons-material/Public';

const Leagues = () => {
  const theme = useTheme();
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const response = await fetch('/api/leagues');
        if (!response.ok) {
          throw new Error('Failed to fetch leagues');
        }
        const data = await response.json();
        setLeagues(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchLeagues();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          background: theme.palette.mode === 'dark'
            ? `linear-gradient(135deg, ${alpha(theme.palette.background.default, 0.9)} 0%, ${alpha(theme.palette.background.default, 0.95)} 100%)`
            : `linear-gradient(135deg, ${alpha('#fff', 0.9)} 0%, ${alpha('#fff', 0.95)} 100%)`,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          p: 3,
          minHeight: '100vh',
          background: theme.palette.mode === 'dark'
            ? `linear-gradient(135deg, ${alpha(theme.palette.background.default, 0.9)} 0%, ${alpha(theme.palette.background.default, 0.95)} 100%)`
            : `linear-gradient(135deg, ${alpha('#fff', 0.9)} 0%, ${alpha('#fff', 0.95)} 100%)`,
        }}
      >
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: 3,
        width: '100%',
        minHeight: '100vh',
        background: theme.palette.mode === 'dark'
          ? `linear-gradient(135deg, ${alpha(theme.palette.background.default, 0.9)} 0%, ${alpha(theme.palette.background.default, 0.95)} 100%)`
          : `linear-gradient(135deg, ${alpha('#fff', 0.9)} 0%, ${alpha('#fff', 0.95)} 100%)`,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          fontWeight: 700,
          ...theme.mixins.textGradient(
            `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`
          ),
        }}
      >
        Leagues
      </Typography>

      {leagues.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          No leagues found.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {leagues.map((league, index) => (
            <Grid item xs={12} sm={6} md={4} key={league._id || index}>
              <ContentCard
                type="league"
                image={league.strBadge || league.strLogo || league.image || league.logo}
                name={league.strLeague || league.name}
                subtitle={league.strCountry || league.country}
                details={{
                  country: league.strCountry || league.country,
                  teams: `${league.intFormedYear ? 'Founded ' + league.intFormedYear : 'N/A'}`,
                  season: league.strCurrentSeason || league.currentSeason || 'N/A',
                }}
                stats={[
                  {
                    icon: <EmojiEventsIcon />,
                    label: league.strSport || league.type || 'League',
                  },
                  {
                    icon: <SportsSoccerIcon />,
                    label: league.strLeagueAlternate || league.alternativeName || league.name,
                  },
                  {
                    icon: <PublicIcon />,
                    label: league.strCountry || league.country,
                  },
                ]}
                accentColor={league.primaryColor || theme.palette.info.main}
                onClick={() => {/* Handle league click */}}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Leagues; 