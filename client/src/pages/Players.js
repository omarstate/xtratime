import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { alpha, useTheme } from '@mui/material/styles';
import ContentCard from '../components/ContentCard';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import FlagIcon from '@mui/icons-material/Flag';
import GroupsIcon from '@mui/icons-material/Groups';

const Players = () => {
  const theme = useTheme();
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch('/api/players');
        if (!response.ok) {
          throw new Error('Failed to fetch players');
        }
        const data = await response.json();
        setPlayers(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPlayers();
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
        p: { xs: 1, sm: 2 },
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
          mb: 2,
          px: { xs: 1, sm: 1 },
          fontWeight: 700,
          ...theme.mixins.textGradient(
            `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`
          ),
        }}
      >
        Players
      </Typography>

      {players.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          No players found.
        </Typography>
      ) : (
        <Grid container spacing={{ xs: 1, sm: 2 }}>
          {players.map((player, index) => (
            <Grid item xs={6} sm={6} md={4} lg={3} key={player._id || index}>
              <ContentCard
                type="player"
                image={player.photo}
                name={player.name}
                subtitle={player.team}
                details={{
                  position: player.position,
                  nationality: player.nationality,
                }}
                stats={[
                  {
                    icon: <SportsSoccerIcon />,
                    label: player.goals ? `${player.goals} Goals` : 'No Goals',
                  },
                  {
                    icon: <FlagIcon />,
                    label: player.nationality,
                  },
                  {
                    icon: <GroupsIcon />,
                    label: player.position,
                  },
                ]}
                accentColor={theme.palette.primary.main}
                onClick={() => {/* Handle player click */}}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Players; 