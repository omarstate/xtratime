import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { motion } from 'framer-motion';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Flags from 'country-flag-icons/react/3x2'
import NavBar from './components/NavBar';
import Sidebar from './components/Sidebar';
import SplitText from './components/SplitText';
import TiltedCard from './components/TiltedCard';
import { getDesignTokens } from './theme';
import { ColorModeContext } from './context/ColorModeContext';

const pages = [
  { label: 'Matches', path: '/matches' },
  { label: 'Players', path: '/players' },
  { label: 'Stadiums', path: '/stadiums' },
  { label: 'Leagues', path: '/leagues' },
];

const MotionGrid = motion(Grid);
const MotionContainer = motion(Container);

function Placeholder({ label }) {
  return (
    <Box 
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      sx={{ 
        py: 12,
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(45,52,54,0.02) 0%, rgba(0,184,148,0.05) 100%)',
        borderRadius: 4,
        my: 4
      }}
    >
      <Typography 
        variant="h2" 
        color="primary" 
        fontWeight={800} 
        gutterBottom
        sx={{
          background: 'linear-gradient(135deg, #2D3436 0%, #00B894 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        {label}
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', px: 3 }}>
        This section is currently in development. Stay tuned for exciting updates!
      </Typography>
    </Box>
  );
}

function Players() {
  const [players, setPlayers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  // Helper function to get country code
  const getCountryCode = (nationality) => {
    try {
      // Handle common cases
      const commonCountries = {
        'England': 'GB',
        'Scotland': 'GB',
        'Wales': 'GB',
        'Northern Ireland': 'GB',
        'Spain': 'ES',
        'Germany': 'DE',
        'Uruguay': 'UY',
        'Korea Republic': 'KR',
        'United States': 'US',
        'USA': 'US',
        'DR Congo': 'CD',
        'Cape Verde': 'CV',
        'Republic of Ireland': 'IE',
        'Bosnia and Herzegovina': 'BA',
        'Czech Republic': 'CZ',
        'Brasil': 'BR',
        'Brazil': 'BR',
        'Argentina': 'AR',
        'Portugal': 'PT',
        'France': 'FR',
        'Italy': 'IT',
        'Netherlands': 'NL',
        'Belgium': 'BE',
      };
      
      // Check common countries first
      if (commonCountries[nationality]) {
        return commonCountries[nationality];
      }
      
      // Try to find a matching flag component
      const possibleCodes = Object.keys(Flags);
      
      // First try exact match
      const exactMatch = possibleCodes.find(code => 
        code.toLowerCase() === nationality.slice(0, 2).toLowerCase()
      );
      if (exactMatch) return exactMatch;
      
      // If no match found, return null
      return null;
    } catch (e) {
      return null;
    }
  };

  React.useEffect(() => {
    setLoading(true);
    fetch('/api/players')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch players');
        return res.json();
      })
      .then((data) => {
        setPlayers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box sx={{ 
        py: 12, 
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(45,52,54,0.02) 0%, rgba(0,184,148,0.05) 100%)',
      }}>
        <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 600 }}>
          Loading amazing players...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ 
        py: 12, 
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(255,118,117,0.1) 0%, rgba(45,52,54,0.05) 100%)',
      }}>
        <Typography variant="h5" sx={{ color: 'error.main', fontWeight: 500 }}>{error}</Typography>
      </Box>
    );
  }

  if (!players.length) {
    return (
      <Box sx={{ 
        py: 12, 
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(45,52,54,0.02) 0%, rgba(0,184,148,0.05) 100%)',
      }}>
        <Typography variant="h5" color="text.secondary">No players found at the moment.</Typography>
      </Box>
    );
  }

  return (
    <MotionContainer 
      maxWidth="xl" 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      sx={{ 
        py: 8,
        px: { xs: 2, sm: 4, md: 6 }
      }}
    >
      <Box sx={{ 
        textAlign: 'center', 
        mb: 8,
        position: 'relative'
      }}>
        <SplitText
          text="Players"
          className="MuiTypography-root MuiTypography-h1"
          delay={100}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
          style={{
            fontWeight: 800,
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            background: 'linear-gradient(135deg, #2D3436 0%, #00B894 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '120%',
            height: '120%',
            background: 'radial-gradient(circle, rgba(0,184,148,0.08) 0%, rgba(255,255,255,0) 70%)',
            zIndex: -1
          }}
        />
      </Box>
      <Grid container spacing={4}>
        {players.map((player, i) => (
          <MotionGrid 
            item 
            xs={12} 
            sm={6} 
            md={4} 
            lg={3} 
            key={player._id || player.name + i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <TiltedCard
              imageSrc={player.strCutout || 'https://via.placeholder.com/300'}
              altText={player.name}
              captionText={player.name}
              containerHeight="280px"
              containerWidth="100%"
              imageHeight="180px"
              imageWidth="180px"
              rotateAmplitude={5}
              scaleOnHover={1.05}
              showMobileWarning={false}
              showTooltip={false}
              displayOverlayContent={true}
              overlayContent={
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                    <strong>Team:</strong> {player.team}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                    <strong>Position:</strong> {player.position || 'N/A'}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center', gap: 1 }}>
                    <strong>Nationality:</strong> 
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {(() => {
                        const countryCode = getCountryCode(player.nationality);
                        if (countryCode && Flags[countryCode]) {
                          const FlagComponent = Flags[countryCode];
                          return <FlagComponent style={{ width: '1.5em', height: 'auto' }} />;
                        }
                        return null;
                      })()}
                      {player.nationality}
                    </Box>
                  </Typography>
                </Box>
              }
            />
          </MotionGrid>
        ))}
      </Grid>
    </MotionContainer>
  );
}

function Matches() {
  return <Placeholder label="Matches" />;
}

function Stadiums() {
  const [stadiums, setStadiums] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    setLoading(true);
    fetch('/api/stadiums')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch stadiums');
        return res.json();
      })
      .then((data) => {
        setStadiums(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box sx={{ 
        py: 12, 
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(45,52,54,0.02) 0%, rgba(0,184,148,0.05) 100%)',
      }}>
        <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 600 }}>
          Loading stadiums...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ 
        py: 12, 
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(255,118,117,0.1) 0%, rgba(45,52,54,0.05) 100%)',
      }}>
        <Typography variant="h5" sx={{ color: 'error.main', fontWeight: 500 }}>{error}</Typography>
      </Box>
    );
  }

  if (!stadiums.length) {
    return (
      <Box sx={{ 
        py: 12, 
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(45,52,54,0.02) 0%, rgba(0,184,148,0.05) 100%)',
      }}>
        <Typography variant="h5" color="text.secondary">No stadiums found at the moment.</Typography>
      </Box>
    );
  }

  return (
    <MotionContainer 
      maxWidth="xl" 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      sx={{ 
        py: 8,
        px: { xs: 2, sm: 4, md: 6 }
      }}
    >
      <Box sx={{ 
        textAlign: 'center', 
        mb: 8,
        position: 'relative'
      }}>
        <SplitText
          text="Stadiums"
          className="MuiTypography-root MuiTypography-h1"
          delay={100}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
          style={{
            fontWeight: 800,
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            background: 'linear-gradient(135deg, #2D3436 0%, #00B894 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '120%',
            height: '120%',
            background: 'radial-gradient(circle, rgba(0,184,148,0.08) 0%, rgba(255,255,255,0) 70%)',
            zIndex: -1
          }}
        />
      </Box>
      <Grid container spacing={4}>
        {stadiums.map((stadium, i) => (
          <MotionGrid 
            item 
            xs={12} 
            sm={6} 
            md={4} 
            lg={3} 
            key={stadium._id || stadium.idVenue + i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <TiltedCard
              imageSrc={stadium.strThumb || stadium.strFanart1 || 'https://via.placeholder.com/300'}
              altText={stadium.strVenue}
              captionText={stadium.strVenue}
              subText={`${stadium.strLocation}, ${stadium.strCountry}`}
              containerHeight="280px"
              containerWidth="100%"
              imageHeight="180px"
              imageWidth="280px"
              rotateAmplitude={5}
              scaleOnHover={1.05}
              showMobileWarning={false}
              showTooltip={true}
              tooltipContent={stadium.strDescriptionEN || 'No description available'}
            />
          </MotionGrid>
        ))}
      </Grid>
    </MotionContainer>
  );
}

function Leagues() {
  return <Placeholder label="Leagues" />;
}

function App() {
  const [mode, setMode] = React.useState('dark');
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

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
        <Box sx={{ 
          display: 'flex',
          minHeight: '100vh',
          position: 'relative',
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, rgba(45,52,54,0.4) 0%, rgba(0,184,148,0.1) 100%)'
            : 'linear-gradient(135deg, rgba(45,52,54,0.02) 0%, rgba(0,184,148,0.05) 100%)',
          overflow: 'hidden',
        }}>
          <Box
            sx={{
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              width: '100%',
            }}
          >
            <Sidebar open={sidebarOpen} onClose={toggleSidebar} />
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                transition: theme.transitions.create(['margin'], {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.leavingScreen,
                }),
              }}
            >
              <NavBar onSidebarToggle={toggleSidebar} />
              <Routes>
                <Route path="/players" element={<Players />} />
                <Route path="/matches" element={<Matches />} />
                <Route path="/stadiums" element={<Stadiums />} />
                <Route path="/leagues" element={<Leagues />} />
                <Route path="*" element={<Players />} />
              </Routes>
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;