import React from 'react';
import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Chip from '@mui/material/Chip';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';

const GENERIC_STADIUM_IMAGE = process.env.PUBLIC_URL + '/assets/stadiums/generic-stadium.svg';

const TiltedCard = ({
  imageSrc,
  altText,
  captionText,
  containerHeight = '320px',
  containerWidth = '100%',
  imageHeight = '200px',
  imageWidth = '200px',
  imageStyle = {},
  rotateAmplitude = 5,
  scaleOnHover = 1.05,
  showMobileWarning = false,
  showTooltip = true,
  displayOverlayContent = false,
  overlayContent,
  variant = 'default'
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [imgSrc, setImgSrc] = React.useState(imageSrc);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const cardRef = React.useRef(null);

  React.useEffect(() => {
    setImgSrc(imageSrc);
  }, [imageSrc]);

  const handleImageError = () => {
    console.log('Image failed to load:', imgSrc);
    setImgSrc(process.env.PUBLIC_URL + '/assets/stadiums/generic-stadium.svg');
  };

  const handleMouseMove = (e) => {
    if (isMobile && showMobileWarning) return;

    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -rotateAmplitude;
    const rotateY = ((x - centerX) / centerX) * rotateAmplitude;

    card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(${isHovered ? scaleOnHover : 1})
    `;
  };

  const handleMouseLeave = () => {
    if (isMobile && showMobileWarning) return;
    
    const card = cardRef.current;
    if (!card) return;

    card.style.transform = `
      perspective(1000px)
      rotateX(0deg)
      rotateY(0deg)
      scale(1)
    `;
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    if (isMobile && showMobileWarning) return;
    setIsHovered(true);
  };

  const playerDetails = React.useMemo(() => {
    if (!overlayContent) return null;
    
    const content = overlayContent.props.children;
    if (Array.isArray(content)) {
      return content.filter(child => child.type === Typography).map(child => {
        const text = child.props.children;
        if (Array.isArray(text)) {
          const [label, value] = text;
          return { label: label.props.children, value };
        }
        return { value: text };
      });
    }
    return null;
  }, [overlayContent]);

  const getImageContainerStyles = () => ({
    width: '100%',
    height: imageHeight,
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '20px 20px 0 0',
    background: theme.palette.mode === 'dark' 
      ? 'linear-gradient(135deg, rgba(45,52,54,0.4) 0%, rgba(0,184,148,0.1) 100%)'
      : 'linear-gradient(135deg, rgba(248,249,250,1) 0%, rgba(0,184,148,0.05) 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  });

  const getImageStyles = () => {
    const baseStyles = {
      transition: 'transform 0.3s ease-out',
      transform: isHovered ? 'scale(1.05)' : 'scale(1)',
    };

    if (variant === 'stadium') {
      return {
        ...baseStyles,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        ...imageStyle
      };
    }

    return {
      ...baseStyles,
      height: '100%',
      width: '100%',
      objectFit: 'contain',
      filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.1))',
      ...imageStyle
    };
  };

  return (
    <Box
      component={motion.div}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.43, 0.13, 0.23, 0.96],
      }}
      sx={{
        position: 'relative',
        height: containerHeight,
        width: containerWidth,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        transition: 'all 0.3s ease-out',
        transformStyle: 'preserve-3d',
        borderRadius: '20px',
        overflow: 'hidden',
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(45,52,54,0.3)' : 'background.paper',
        backdropFilter: 'blur(10px)',
        boxShadow: isHovered
          ? '0 20px 40px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,184,148,0.1)'
          : '0 10px 30px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,184,148,0.05)',
      }}
    >
      <Box sx={getImageContainerStyles()}>
        <Box
          component="img"
          src={imgSrc}
          alt={altText}
          onError={handleImageError}
          sx={getImageStyles()}
        />
      </Box>

      <Box
        sx={{
          width: '100%',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          flex: 1,
          background: theme.palette.mode === 'dark' ? 'rgba(45,52,54,0.3)' : 'background.paper',
          borderRadius: '0 0 20px 20px'
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            fontSize: '1rem',
            textAlign: 'left',
            color: 'text.primary',
            letterSpacing: '-0.01em',
            transform: isHovered ? 'translateZ(10px)' : 'translateZ(0)',
            transition: 'transform 0.3s ease-out',
          }}
        >
          {captionText}
        </Typography>
        
        {playerDetails && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {playerDetails.map((detail, index) => {
              if (detail.label === 'Team:') {
                return (
                  <Chip
                    key={index}
                    size="small"
                    icon={<WorkIcon />}
                    label={detail.value}
                    sx={{
                      backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0,184,148,0.1)' : 'rgba(0,184,148,0.05)',
                      color: 'text.primary',
                      '& .MuiChip-icon': {
                        color: 'secondary.main',
                      },
                    }}
                  />
                );
              }
              if (detail.label === 'Nationality:') {
                return (
                  <Chip
                    key={index}
                    size="small"
                    icon={<LocationOnIcon />}
                    label={detail.value}
                    sx={{
                      backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0,184,148,0.1)' : 'rgba(0,184,148,0.05)',
                      color: 'text.primary',
                      '& .MuiChip-icon': {
                        color: 'secondary.main',
                      },
                    }}
                  />
                );
              }
              if (detail.label === 'Position:') {
                return (
                  <Typography
                    key={index}
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      transform: isHovered ? 'translateZ(10px)' : 'translateZ(0)',
                      transition: 'transform 0.3s ease-out',
                    }}
                  >
                    {detail.value}
                  </Typography>
                );
              }
              return null;
            })}
          </Box>
        )}

        {displayOverlayContent && overlayContent}
      </Box>
    </Box>
  );
};

export default TiltedCard;