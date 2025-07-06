import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import { alpha, useTheme } from '@mui/material/styles';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PublicIcon from '@mui/icons-material/Public';
import PeopleIcon from '@mui/icons-material/People';
import StadiumIcon from '@mui/icons-material/Stadium';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ColorModeContext } from '../context/ColorModeContext';

const NAVIGATION_ITEMS = [
  { 
    name: 'Players', 
    path: '/players', 
    icon: <PeopleIcon />,
    description: 'Browse and manage players'
  },
  { 
    name: 'Stadiums', 
    path: '/stadiums', 
    icon: <StadiumIcon />,
    description: 'View all stadiums'
  },
  { 
    name: 'Leagues', 
    path: '/leagues', 
    icon: <EmojiEventsIcon />,
    description: 'Explore leagues'
  },
];

const POPULAR_LEAGUES = [
  {
    name: 'Premier League',
    country: 'England',
    icon: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    color: '#3D195B',
  },
  {
    name: 'Champions League',
    country: 'Europe',
    icon: <EmojiEventsIcon fontSize="small" />,
    isSpecial: true,
    color: '#00235E',
  },
  {
    name: 'La Liga',
    country: 'Spain',
    icon: '🇪🇸',
    color: '#EE1B2E',
  },
  {
    name: 'Bundesliga',
    country: 'Germany',
    icon: '🇩🇪',
    color: '#D41E2A',
  },
  {
    name: 'Serie A',
    country: 'Italy',
    icon: '🇮🇹',
    color: '#008FD7',
  },
  {
    name: 'Ligue 1',
    country: 'France',
    icon: '🇫🇷',
    color: '#002D5C',
  },
  {
    name: 'World Cup',
    country: 'International',
    icon: <PublicIcon fontSize="small" />,
    isSpecial: true,
    color: '#1A171B',
  },
];

const MotionListItem = motion(ListItem);
const MotionBox = motion(Box);

const Sidebar = ({ open, onClose, width = 280 }) => {
  const theme = useTheme();
  const location = useLocation();
  const colorMode = React.useContext(ColorModeContext);

  const sidebarVariants = {
    open: {
      width: width,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
    closed: {
      width: 72,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? width : 72,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? width : 72,
          boxSizing: 'border-box',
          overflow: 'visible',
          border: 'none',
          ...theme.mixins.glassmorphism(0.8, 20),
        },
      }}
    >
      <MotionBox
        animate={open ? 'open' : 'closed'}
        variants={sidebarVariants}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        {/* Toggle Button */}
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: -20,
            top: 24,
            width: 40,
            height: 40,
            borderRadius: '50%',
            backgroundColor: 'background.paper',
            boxShadow: theme.shadows[3],
            color: 'primary.main',
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.main, 0.08),
            },
            zIndex: 1,
          }}
        >
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>

        {/* Header */}
        <Box
          sx={{
            p: 2.5,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Avatar
            component={motion.div}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.8 }}
            sx={{
              width: 40,
              height: 40,
              bgcolor: 'primary.main',
              boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            }}
          >
            <SportsSoccerIcon />
          </Avatar>
          <AnimatePresence>
            {open && (
              <MotionBox
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    ...theme.mixins.textGradient(
                      'linear-gradient(135deg, #2563EB 0%, #10B981 100%)'
                    ),
                  }}
                >
                  XtraTime
                </Typography>
              </MotionBox>
            )}
          </AnimatePresence>
        </Box>

        <Divider sx={{ borderColor: 'divider' }} />

        {/* Navigation */}
        <List sx={{ px: 2 }}>
          {NAVIGATION_ITEMS.map((item, index) => (
            <Tooltip
              key={item.path}
              title={open ? '' : item.description}
              placement="right"
              arrow
            >
              <MotionListItem
                disablePadding
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                sx={{ mb: 1 }}
              >
                <ListItemButton
                  component={RouterLink}
                  to={item.path}
                  selected={location.pathname === item.path}
                  sx={{
                    minHeight: 48,
                    px: 2,
                    borderRadius: 2,
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      inset: 0,
                      zIndex: 1,
                      background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.2)} 0%, ${alpha(theme.palette.primary.dark, 0.2)} 100%)`,
                      opacity: 0,
                      transition: 'opacity 0.2s',
                    },
                    '&.Mui-selected': {
                      '&::before': {
                        opacity: 1,
                      },
                    },
                    '&:hover': {
                      '&::before': {
                        opacity: 0.5,
                      },
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 2 : 'auto',
                      color: location.pathname === item.path ? 'primary.main' : 'text.secondary',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.name}
                    sx={{
                      opacity: open ? 1 : 0,
                      '& .MuiTypography-root': {
                        fontWeight: 600,
                        fontSize: '0.875rem',
                      },
                    }}
                  />
                  {location.pathname === item.path && (
                    <Box
                      component={motion.div}
                      layoutId="activeIndicator"
                      sx={{
                        width: 4,
                        height: 32,
                        borderRadius: 2,
                        bgcolor: 'primary.main',
                        position: 'absolute',
                        right: 0,
                        top: '50%',
                        transform: 'translateY(-50%)',
                      }}
                    />
                  )}
                </ListItemButton>
              </MotionListItem>
            </Tooltip>
          ))}
        </List>

        <Divider sx={{ my: 2, borderColor: 'divider' }} />

        {/* Leagues */}
        <Box sx={{ px: 3, mb: 2 }}>
          <Typography
            variant="overline"
            sx={{
              fontSize: '0.75rem',
              fontWeight: 700,
              color: 'text.secondary',
              display: open ? 'block' : 'none',
              letterSpacing: '0.1em',
            }}
          >
            Popular Leagues
          </Typography>
        </Box>

        <List sx={{ px: 2, overflow: 'auto', flex: 1 }}>
          {POPULAR_LEAGUES.map((league, index) => (
            <Tooltip
              key={league.name}
              title={open ? '' : `${league.name} (${league.country})`}
              placement="right"
              arrow
            >
              <MotionListItem
                disablePadding
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                sx={{ mb: 1 }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 44,
                    px: 2,
                    borderRadius: 2,
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      inset: 0,
                      zIndex: 1,
                      background: `linear-gradient(135deg, ${alpha(league.color, 0.1)} 0%, ${alpha(league.color, 0.05)} 100%)`,
                      opacity: 0,
                      transition: 'opacity 0.2s',
                    },
                    '&:hover': {
                      '&::before': {
                        opacity: 1,
                      },
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 2 : 'auto',
                      color: league.isSpecial ? 'primary.main' : 'inherit',
                    }}
                  >
                    {typeof league.icon === 'string' ? (
                      <Typography variant="body2" component="span" sx={{ fontSize: '1.25rem' }}>
                        {league.icon}
                      </Typography>
                    ) : league.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={league.name}
                    secondary={league.country}
                    sx={{
                      opacity: open ? 1 : 0,
                      m: 0,
                      '& .MuiTypography-root': {
                        fontWeight: league.isSpecial ? 600 : 500,
                        fontSize: '0.875rem',
                        color: league.isSpecial ? 'primary.main' : 'text.primary',
                      },
                      '& .MuiTypography-secondary': {
                        fontSize: '0.75rem',
                        color: 'text.secondary',
                        mt: 0.25,
                      },
                    }}
                  />
                </ListItemButton>
              </MotionListItem>
            </Tooltip>
          ))}
        </List>

        {/* Footer */}
        <Box
          sx={{
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: open ? 'space-between' : 'center',
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Tooltip title={`Switch to ${theme.palette.mode === 'dark' ? 'light' : 'dark'} mode`}>
            <IconButton
              onClick={colorMode.toggleColorMode}
              sx={{
                width: 34,
                height: 34,
                borderRadius: 2,
                backgroundColor: alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.1 : 0.05),
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.2 : 0.1),
                },
              }}
            >
              {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Tooltip>
          {open && (
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                fontWeight: 500,
              }}
            >
              v1.0.0
            </Typography>
          )}
        </Box>
      </MotionBox>
    </Drawer>
  );
};

export default Sidebar; 