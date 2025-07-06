import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { alpha, useTheme } from '@mui/material/styles';
import ContentCard from '../components/ContentCard';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GroupsIcon from '@mui/icons-material/Groups';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const Stadiums = () => {
  const theme = useTheme();
  const [stadiums, setStadiums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStadiums = async () => {
      try {
        const response = await fetch('/api/stadiums');
        if (!response.ok) {
          throw new Error('Failed to fetch stadiums');
        }
        const data = await response.json();
        setStadiums(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchStadiums();
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
        Stadiums
      </Typography>

      {stadiums.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          No stadiums found.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {stadiums.map((stadium, index) => (
            <Grid item xs={12} sm={6} md={4} key={stadium._id || index}>
              <ContentCard
                type="stadium"
                image={stadium.strStadiumThumb || stadium.image || '/assets/stadiums/generic-stadium.svg'}
                name={stadium.strStadium || stadium.name}
                subtitle={stadium.strDescriptionEN?.slice(0, 150) || stadium.description}
                details={{
                  location: stadium.strLocation || stadium.location,
                  capacity: `${(stadium.intStadiumCapacity || stadium.capacity || 0).toLocaleString()} seats`,
                  team: stadium.strTeam || stadium.team,
                }}
                stats={[
                  {
                    icon: <LocationOnIcon />,
                    label: stadium.strLocation || stadium.location || stadium.city,
                  },
                  {
                    icon: <GroupsIcon />,
                    label: `${(stadium.intStadiumCapacity || stadium.capacity || 0).toLocaleString()} capacity`,
                  },
                  {
                    icon: <EmojiEventsIcon />,
                    label: stadium.strTeam || stadium.team,
                  },
                ]}
                accentColor={theme.palette.secondary.main}
                onClick={() => {/* Handle stadium click */}}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Stadiums; 