import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { motion } from 'framer-motion';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '@mui/material/styles';
import { ColorModeContext } from '../context/ColorModeContext';

const pages = [
  { label: 'Players', path: '/players' },
  { label: 'Matches', path: '/matches' },
  { label: 'Stadiums', path: '/stadiums' },
  { label: 'Leagues', path: '/leagues' },
];

const MotionButton = motion(Button);

function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const location = useLocation();
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{
        background: theme.palette.mode === 'dark' ? 'rgba(45, 52, 54, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid',
        borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(45, 52, 54, 0.08)'
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ py: 1 }}>
          <SportsSoccerIcon
            component={motion.svg}
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            sx={{ 
              display: { xs: 'none', md: 'flex' }, 
              mr: 2,
              color: 'primary.main'
            }}
          />
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 4,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: 'primary.main',
              textDecoration: 'none',
              background: 'linear-gradient(135deg, #2D3436 0%, #00B894 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            XtraTime
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="primary"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem 
                  key={page.path} 
                  onClick={handleCloseNavMenu}
                  component={RouterLink}
                  to={page.path}
                  selected={location.pathname === page.path}
                  sx={{
                    color: location.pathname === page.path ? 'secondary.main' : 'primary.main',
                    '&.Mui-selected': {
                      backgroundColor: 'rgba(0, 184, 148, 0.08)',
                    }
                  }}
                >
                  <Typography textAlign="center">{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <SportsSoccerIcon
            component={motion.svg}
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            sx={{ 
              display: { xs: 'flex', md: 'none' }, 
              mr: 1,
              color: 'primary.main'
            }}
          />
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: 'primary.main',
              textDecoration: 'none',
              background: 'linear-gradient(135deg, #2D3436 0%, #00B894 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            XtraTime
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            {pages.map((page) => (
              <MotionButton
                key={page.path}
                component={RouterLink}
                to={page.path}
                onClick={handleCloseNavMenu}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                sx={{
                  color: location.pathname === page.path ? 'secondary.main' : 'text.primary',
                  display: 'block',
                  fontWeight: 600,
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    transform: location.pathname === page.path ? 'translateX(-50%)' : 'translateX(-50%) scaleX(0)',
                    height: '2px',
                    width: '100%',
                    background: 'linear-gradient(90deg, #00B894 0%, #55EFC4 100%)',
                    transition: 'transform 0.3s ease-in-out',
                  },
                  '&:hover::after': {
                    transform: 'translateX(-50%) scaleX(1)',
                  }
                }}
              >
                {page.label}
              </MotionButton>
            ))}
          </Box>

          <Box sx={{ ml: 2 }}>
            <IconButton 
              sx={{ ml: 1 }} 
              onClick={colorMode.toggleColorMode} 
              color="inherit"
              component={motion.button}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;