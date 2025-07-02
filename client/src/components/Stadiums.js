import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { motion } from 'framer-motion';
import TiltedCard from './TiltedCard';
import SplitText from './SplitText';

const MotionGrid = motion(Grid);
const MotionContainer = motion(Container);

const GENERIC_STADIUM_IMAGE = '/assets/stadiums/generic-stadium.svg';

function Stadiums() {
  const [stadiums, setStadiums] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    setLoading(true);
    console.log('Fetching stadiums...');
    fetch('/api/stadiums')
      .then((res) => {
        console.log('Stadiums response:', res);
        if (!res.ok) throw new Error('Failed to fetch stadiums');
        return res.json();
      })
      .then((data) => {
        console.log('Stadiums data:', data);
        setStadiums(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching stadiums:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const getStadiumImage = (stadium) => {
    const possibleImages = [
      stadium.strThumb,
      stadium.strFanart1,
      stadium.strFanart2,
      stadium.strFanart3,
      stadium.strFanart4
    ].filter(Boolean);

    console.log('Stadium images for', stadium.strVenue, ':', possibleImages);
    console.log('Using fallback image:', GENERIC_STADIUM_IMAGE);
    
    return possibleImages[0] || GENERIC_STADIUM_IMAGE;
  };

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
        {stadiums.map((stadium, i) => {
          const imageSrc = getStadiumImage(stadium);
          console.log(`Stadium ${stadium.strVenue} using image:`, imageSrc);
          
          return (
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
                imageSrc={imageSrc}
                altText={stadium.strVenue}
                captionText={stadium.strVenue}
                subText={stadium.strVenueSponsor ? `${stadium.strLocation} • ${stadium.strVenueSponsor}` : stadium.strLocation}
                containerHeight="320px"
                containerWidth="100%"
                imageHeight="220px"
                variant="stadium"
                imageStyle={{
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%'
                }}
                rotateAmplitude={5}
                scaleOnHover={1.05}
                showMobileWarning={false}
                showTooltip={true}
                tooltipContent={
                  <Box>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Country:</strong> {stadium.strCountry}
                    </Typography>
                    {stadium.intFormedYear && (
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Built:</strong> {stadium.intFormedYear}
                      </Typography>
                    )}
                    {stadium.strDescriptionEN && (
                      <Typography variant="body2" sx={{ mt: 2 }}>
                        {stadium.strDescriptionEN}
                      </Typography>
                    )}
                  </Box>
                }
              />
            </MotionGrid>
          );
        })}
      </Grid>
    </MotionContainer>
  );
}

export default Stadiums; 