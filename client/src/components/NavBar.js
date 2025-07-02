import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';

export default function NavBar() {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        minHeight: 80,
        px: { xs: 1, md: 4 },
        pt: 2,
        pb: 1,
        background: 'transparent',
      }}
    >
      {/* App name on the very left */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: 800,
          letterSpacing: 1,
          color: '#fff',
          flexShrink: 0,
          zIndex: 2,
        }}
      >
        XtraTime
      </Typography>
      {/* Centered nav bar */}
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        <Paper
          elevation={6}
          sx={{
            borderRadius: 999,
            overflow: 'hidden',
            background: 'rgba(25, 118, 210, 0.85)',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
            px: 3,
            py: 1,
            display: 'flex',
            gap: 2,
            pointerEvents: 'auto',
          }}
        >
          <Button color="inherit" component={RouterLink} to="/" sx={{ fontWeight: 600, borderRadius: 2, color: '#fff' }}>
            Home
          </Button>
          <Button color="inherit" component={RouterLink} to="/players" sx={{ fontWeight: 600, borderRadius: 2, color: '#fff' }}>
            Players
          </Button>
          <Button color="inherit" component={RouterLink} to="/matches" sx={{ fontWeight: 600, borderRadius: 2, color: '#fff' }}>
            Matches
          </Button>
          <Button color="inherit" component={RouterLink} to="/leagues" sx={{ fontWeight: 600, borderRadius: 2, color: '#fff' }}>
            Leagues
          </Button>
          <Button color="inherit" component={RouterLink} to="/stadiums" sx={{ fontWeight: 600, borderRadius: 2, color: '#fff' }}>
            Stadiums
          </Button>
        </Paper>
      </Box>
    </Box>
  );
}