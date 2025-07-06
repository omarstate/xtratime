import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider, createTheme, alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './components/Sidebar';
import { getDesignTokens } from './theme';
import { ColorModeContext } from './context/ColorModeContext';
import Players from './pages/Players';
import Stadiums from './pages/Stadiums';
import Leagues from './pages/Leagues';

const pageTransitionVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 1, 1],
    },
  },
};

function Placeholder({ label }) {
  const theme = React.useContext(ThemeProvider).theme;
  
  return (
    <Box 
      component={motion.div}
      variants={pageTransitionVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      sx={{ 
        position: 'relative',
        py: { xs: 6, md: 12 },
        textAlign: 'center',
        borderRadius: 4,
        overflow: 'hidden',
        isolation: 'isolate',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background: (theme) => theme.palette.mode === 'dark'
            ? `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.12)} 0%, ${alpha(theme.palette.secondary.dark, 0.12)} 100%)`
            : `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.12)} 0%, ${alpha(theme.palette.secondary.light, 0.12)} 100%)`,
          zIndex: -1,
        },
      }}
    >
      <Typography 
        variant="h2" 
        gutterBottom
        sx={{
          fontWeight: 700,
          ...theme.mixins.textGradient(
            'linear-gradient(135deg, #2563EB 0%, #10B981 100%)'
          ),
        }}
      >
        {label}
      </Typography>
      <Typography 
        variant="h6" 
        color="text.secondary" 
        sx={{ 
          maxWidth: 600, 
          mx: 'auto', 
          px: 3,
          opacity: 0.8,
        }}
      >
        This section is currently in development. Stay tuned for exciting updates!
      </Typography>
    </Box>
  );
}

function Matches() {
  return <Placeholder label="Matches" />;
}

function App() {
  const [mode, setMode] = React.useState('dark');
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const location = useLocation();

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box 
          sx={{ 
            display: 'flex',
            minHeight: '100vh',
            background: theme.palette.mode === 'dark'
              ? `linear-gradient(135deg, ${alpha('#0F172A', 0.95)} 0%, ${alpha('#1E293B', 0.95)} 100%)`
              : `linear-gradient(135deg, ${alpha('#F8FAFC', 0.98)} 0%, ${alpha('#F1F5F9', 0.98)} 100%)`,
            '&::before': {
              content: '""',
              position: 'fixed',
              inset: 0,
              background: `radial-gradient(circle at 50% 0%, ${alpha(theme.palette.primary.main, 0.12)} 0%, transparent 50%)`,
              pointerEvents: 'none',
            },
          }}
        >
          <Sidebar open={sidebarOpen} onClose={toggleSidebar} />
          
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
              marginLeft: sidebarOpen ? '280px' : '72px',
              width: `calc(100% - ${sidebarOpen ? '280px' : '72px'})`,
            }}
          >
            {/* Mobile menu button */}
            <Box
              sx={{
                position: 'sticky',
                top: 0,
                zIndex: 10,
                display: { xs: 'flex', md: 'none' },
                alignItems: 'center',
                p: 2,
                backdropFilter: 'blur(20px)',
                backgroundColor: alpha(theme.palette.background.default, 0.8),
                borderBottom: '1px solid',
                borderColor: 'divider',
              }}
            >
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={toggleSidebar}
                edge="start"
                sx={{
                  mr: 2,
                  ...(sidebarOpen && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
            </Box>

            {/* Page content */}
            <Container 
              maxWidth="xl" 
              sx={{ 
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                pt: { xs: 2, md: 4 },
                pb: 4,
                px: { xs: 2, sm: 3, md: 4 },
              }}
            >
              <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                  <Route path="/players" element={<Players />} />
                  <Route path="/matches" element={<Matches />} />
                  <Route path="/stadiums" element={<Stadiums />} />
                  <Route path="/leagues" element={<Leagues />} />
                  <Route path="*" element={<Players />} />
                </Routes>
              </AnimatePresence>
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;