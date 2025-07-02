import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import NavBar from './components/NavBar';
import SplitText from './components/SplitText';
import TiltedCard from './components/TiltedCard';

const pages = [
  { label: 'Matches', path: '/matches' },
  { label: 'Players', path: '/players' },
  { label: 'Stadiums', path: '/stadiums' },
  { label: 'Leagues', path: '/leagues' },
];

function Placeholder({ label }) {
  return (
    <Box sx={{ py: 8, textAlign: 'center' }}>
      <Typography variant="h3" color="primary" fontWeight={700} gutterBottom>
        {label}
      </Typography>
      <Typography variant="h6" color="text.secondary">
        This page is under construction.
      </Typography>
    </Box>
  );
}

function Players() {
  const [players, setPlayers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

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
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5" color="primary">Loading players...</Typography>
      </Box>
    );
  }
  if (error) {
    return (
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5" color="error">{error}</Typography>
      </Box>
    );
  }
  if (!players.length) {
    return (
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5" color="text.secondary">No players found.</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <SplitText
          text="Players"
          className="MuiTypography-root MuiTypography-h2"
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
            fontSize: '2.5rem',
            lineHeight: 1.2,
            letterSpacing: '0.02em',
            color: '#1976d2',
            margin: 0,
          }}
        />
      </Box>
      <Grid container spacing={4}>
        {players.map((player, i) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={player._id || player.name + i}>
            <TiltedCard
              imageSrc={player.strCutout || 'https://via.placeholder.com/300'}
              altText={player.name}
              captionText={player.name}
              containerHeight="320px"
              containerWidth="300px"
              imageHeight="300px"
              imageWidth="300px"
              rotateAmplitude={12}
              scaleOnHover={1.08}
              showMobileWarning={false}
              showTooltip={true}
              displayOverlayContent={true}
              overlayContent={
                <Box sx={{ color: '#fff', textAlign: 'center', p: 2 }}>
                  <strong>{player.name}</strong>
                  <br />
                  <span>Team: {player.team}</span>
                  <br />
                  <span>Position: {player.position || 'N/A'}</span>
                  <br />
                  <span>Nationality: {player.nationality}</span>
                </Box>
              }
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

function Matches() {
  return <Placeholder label="Matches" />;
}
function Stadiums() {
  return <Placeholder label="Stadiums" />;
}
function Leagues() {
  return <Placeholder label="Leagues" />;
}

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/players" element={<Players />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/stadiums" element={<Stadiums />} />
        <Route path="/leagues" element={<Leagues />} />
        <Route path="*" element={<Players />} />
      </Routes>
    </>
  );
}

export default App;