import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import { alpha, useTheme } from '@mui/material/styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GroupsIcon from '@mui/icons-material/Groups';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';

const ContentCard = ({
  type = 'player', // 'player', 'stadium', 'league'
  image,
  name,
  subtitle,
  details = {},
  stats = [],
  accentColor,
  onClick,
}) => {
  const theme = useTheme();
  const isPlayer = type === 'player';
  const isStadium = type === 'stadium';
  const isLeague = type === 'league';

  const cardVariants = {
    initial: { 
      opacity: 0,
      y: 20,
    },
    animate: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    hover: {
      y: -8,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const getIcon = (key) => {
    switch (key.toLowerCase()) {
      case 'location':
        return <LocationOnIcon fontSize="small" />;
      case 'team':
        return <SportsSoccerIcon fontSize="small" />;
      case 'position':
        return <GroupsIcon fontSize="small" />;
      case 'league':
        return <EmojiEventsIcon fontSize="small" />;
      default:
        return null;
    }
  };

  const [imageError, setImageError] = useState(false);
  
  const fallbackImage = type === 'player' 
    ? '/assets/players/player-silhouette.svg'
    : '/assets/stadiums/stadium-silhouette.svg';

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Card
      component={motion.div}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      onClick={onClick}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        cursor: onClick ? 'pointer' : 'default',
        background: theme.palette.mode === 'dark' 
          ? `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.8)} 0%, ${alpha(theme.palette.background.paper, 0.9)} 100%)`
          : `linear-gradient(135deg, ${alpha('#fff', 0.9)} 0%, ${alpha('#fff', 1)} 100%)`,
        backdropFilter: 'blur(8px)',
        border: '1px solid',
        borderColor: theme.palette.mode === 'dark'
          ? alpha(theme.palette.common.white, 0.1)
          : alpha(theme.palette.common.black, 0.1),
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(135deg, ${alpha(accentColor || theme.palette.primary.main, 0.15)} 0%, ${alpha(accentColor || theme.palette.primary.main, 0)} 100%)`,
          borderRadius: 'inherit',
          zIndex: 0,
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          pt: isPlayer ? '75%' : '56.25%', // Reduced from 100% to 75% for players
          overflow: 'hidden',
          '&::after': isPlayer ? {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '50%',
            background: `linear-gradient(to top, ${theme.palette.background.paper}, transparent)`,
            zIndex: 1,
          } : null,
        }}
      >
        <CardMedia
          component={motion.img}
          variants={imageVariants}
          image={imageError ? fallbackImage : image}
          alt={name}
          onError={handleImageError}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: isPlayer ? 'contain' : 'cover',
            objectPosition: isPlayer ? 'top' : 'center',
            transform: isPlayer ? 'scale(0.9)' : 'none', // Scale down player images slightly
            zIndex: 1,
          }}
        />
      </Box>

      <CardContent
        sx={{
          position: 'relative',
          zIndex: 2,
          flex: 1,
          p: 1.5, // Reduced padding from 2.5 to 1.5
          '&:last-child': { pb: 1.5 }, // Fix Material-UI default padding
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            mb: 0.5,
            fontSize: '1rem', // Slightly smaller font size
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            ...theme.mixins.textGradient(
              `linear-gradient(135deg, ${theme.palette.text.primary} 0%, ${alpha(theme.palette.text.primary, 0.8)} 100%)`
            ),
          }}
        >
          {name}
        </Typography>

        {subtitle && (
          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{
              mb: 1, // Reduced margin
              fontSize: '0.875rem', // Slightly smaller font size
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {subtitle}
          </Typography>
        )}

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          {Object.entries(details).map(([key, value]) => (
            <Box
              key={key}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                color: 'text.secondary',
              }}
            >
              {getIcon(key)}
              <Typography
                variant="body2"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  fontSize: '0.8125rem', // Slightly smaller font size
                }}
              >
                <span style={{ color: theme.palette.text.secondary }}>
                  {key}:
                </span>
                <span style={{ color: theme.palette.text.primary, fontWeight: 500 }}>
                  {value}
                </span>
              </Typography>
            </Box>
          ))}
        </Box>

        {stats.length > 0 && (
          <Box
            sx={{
              display: 'flex',
              gap: 0.5, // Reduced gap
              flexWrap: 'wrap',
              mt: 1, // Reduced margin
            }}
          >
            {stats.map((stat, index) => (
              <Chip
                key={index}
                icon={stat.icon}
                label={stat.label}
                size="small"
                sx={{
                  height: '24px', // Smaller height
                  '& .MuiChip-label': {
                    px: 1,
                    fontSize: '0.75rem', // Smaller font size
                  },
                  bgcolor: alpha(accentColor || theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.2 : 0.1),
                  color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.dark,
                  '& .MuiChip-icon': {
                    color: 'inherit',
                    fontSize: '1rem', // Smaller icon size
                  },
                }}
              />
            ))}
          </Box>
        )}
      </CardContent>

      <Box
        sx={{
          position: 'absolute',
          top: 8, // Reduced from 12
          right: 8, // Reduced from 12
          display: 'flex',
          gap: 0.5, // Reduced gap
          zIndex: 2,
        }}
      >
        <IconButton
          size="small"
          sx={{
            width: 28, // Smaller button size
            height: 28,
            bgcolor: alpha(theme.palette.background.paper, 0.8),
            backdropFilter: 'blur(8px)',
            '&:hover': {
              bgcolor: theme.palette.background.paper,
            },
          }}
        >
          <StarIcon sx={{ fontSize: '1rem' }} />
        </IconButton>
        <IconButton
          size="small"
          sx={{
            width: 28, // Smaller button size
            height: 28,
            bgcolor: alpha(theme.palette.background.paper, 0.8),
            backdropFilter: 'blur(8px)',
            '&:hover': {
              bgcolor: theme.palette.background.paper,
            },
          }}
        >
          <FavoriteIcon sx={{ fontSize: '1rem' }} />
        </IconButton>
      </Box>
    </Card>
  );
};

export default ContentCard; 