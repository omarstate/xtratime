import React from 'react';
import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PublicIcon from '@mui/icons-material/Public';

const POPULAR_LEAGUES = [
  {
    name: 'Premier League',
    country: 'England',
    icon: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
  },
  {
    name: 'Champions League',
    country: 'Europe',
    icon: <EmojiEventsIcon fontSize="small" />,
    isSpecial: true,
  },
  {
    name: 'La Liga',
    country: 'Spain',
    icon: '🇪🇸',
  },
  {
    name: 'Bundesliga',
    country: 'Germany',
    icon: '🇩🇪',
  },
  {
    name: 'Serie A',
    country: 'Italy',
    icon: '🇮🇹',
  },
  {
    name: 'Ligue 1',
    country: 'France',
    icon: '🇫🇷',
  },
  {
    name: 'World Cup',
    country: 'International',
    icon: <PublicIcon fontSize="small" />,
    isSpecial: true,
  },
];

const MotionListItem = motion(ListItem);

const Sidebar = ({ open, onClose, width = 240 }) => {
  const theme = useTheme();

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        width: open ? width : 0,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width,
          boxSizing: 'border-box',
          background: theme.palette.mode === 'dark'
            ? 'rgba(26,29,30,0.95)'
            : 'rgba(248,249,250,0.95)',
          backdropFilter: 'blur(10px)',
          borderRight: '1px solid',
          borderColor: theme.palette.mode === 'dark'
            ? 'rgba(248,249,250,0.08)'
            : 'rgba(45,52,54,0.04)',
        },
      }}
    >
      <Box
        sx={{
          py: 2,
          px: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
            color: 'text.primary',
            fontSize: '0.9rem',
          }}
        >
          Top leagues
        </Typography>
      </Box>

      <List sx={{ px: 1 }}>
        {POPULAR_LEAGUES.map((league, index) => (
          <MotionListItem
            key={league.name}
            disablePadding
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <ListItemButton
              sx={{
                borderRadius: 1,
                mb: 0.5,
                py: 0.75,
                '&:hover': {
                  background: theme.palette.mode === 'dark'
                    ? 'rgba(248,249,250,0.05)'
                    : 'rgba(45,52,54,0.04)',
                },
              }}
            >
              <ListItemIcon 
                sx={{ 
                  minWidth: 32,
                  color: league.isSpecial ? 'secondary.main' : 'inherit'
                }}
              >
                {typeof league.icon === 'string' ? (
                  <Typography 
                    variant="body2" 
                    component="span"
                    sx={{ fontSize: '1rem' }}
                  >
                    {league.icon}
                  </Typography>
                ) : league.icon}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      fontWeight: 500,
                      fontSize: '0.875rem',
                      color: league.isSpecial ? 'secondary.main' : 'text.primary'
                    }}
                  >
                    {league.name}
                  </Typography>
                }
              />
            </ListItemButton>
          </MotionListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar; 