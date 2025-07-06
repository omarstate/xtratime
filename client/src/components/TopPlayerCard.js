import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

const TopPlayerCard = ({ player }) => {
  return (
    <Paper
      sx={{
        bgcolor: 'white',
        borderRadius: 4,
        overflow: 'hidden',
        width: 200,
        height: 200,
        position: 'relative',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          p: 2,
          zIndex: 2,
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
          Top Player
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          {player.name}
        </Typography>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '85%',
          '& img': {
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            objectPosition: 'bottom',
          },
        }}
      >
        <img src={player.image} alt={player.name} />
      </Box>
    </Paper>
  );
};

export default TopPlayerCard; 