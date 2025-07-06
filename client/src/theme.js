import { createTheme, alpha } from '@mui/material/styles';

// Custom mixins for advanced effects
const mixins = {
  glassmorphism: (opacity = 0.8, blur = 12) => ({
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
    backgroundColor: (theme) => alpha(
      theme.palette.mode === 'dark' 
        ? '#0F172A' 
        : '#FFFFFF',
      opacity
    ),
  }),
  textGradient: (gradient) => ({
    background: gradient,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  }),
};

const getDesignTokens = (mode) => {
  // Define semantic colors
  const systemColors = {
    blue: {
      25: '#F5F8FF',
      50: '#EFF4FF',
      100: '#D1E0FF',
      200: '#B2CCFF',
      300: '#84ADFF',
      400: '#528BFF',
      500: '#2563EB',
      600: '#1D4ED8',
      700: '#1E40AF',
      800: '#1E3A8A',
      900: '#1E3A8A',
    },
    green: {
      25: '#F5FFF9',
      50: '#ECFDF5',
      100: '#D1FAE5',
      200: '#A7F3D0',
      300: '#6EE7B7',
      400: '#34D399',
      500: '#10B981',
      600: '#059669',
      700: '#047857',
      800: '#065F46',
      900: '#064E3B',
    },
    gray: {
      25: '#FCFCFD',
      50: '#F8FAFC',
      100: '#F1F5F9',
      200: '#E2E8F0',
      300: '#CBD5E1',
      400: '#94A3B8',
      500: '#64748B',
      600: '#475569',
      700: '#334155',
      800: '#1E293B',
      900: '#0F172A',
    },
  };

  return {
    palette: {
      mode,
      primary: {
        main: systemColors.blue[500],
        light: systemColors.blue[400],
        dark: systemColors.blue[600],
        ...systemColors.blue,
      },
      secondary: {
        main: systemColors.green[500],
        light: systemColors.green[400],
        dark: systemColors.green[600],
        ...systemColors.green,
      },
      gray: systemColors.gray,
      background: {
        default: mode === 'dark' ? systemColors.gray[900] : systemColors.gray[50],
        paper: mode === 'dark' ? systemColors.gray[800] : '#FFFFFF',
        subtle: mode === 'dark' ? alpha(systemColors.gray[800], 0.6) : alpha(systemColors.gray[50], 0.8),
      },
      text: {
        primary: mode === 'dark' ? systemColors.gray[100] : systemColors.gray[900],
        secondary: mode === 'dark' ? systemColors.gray[400] : systemColors.gray[500],
        disabled: mode === 'dark' ? systemColors.gray[600] : systemColors.gray[400],
      },
      action: {
        active: mode === 'dark' ? systemColors.gray[100] : systemColors.gray[900],
        hover: mode === 'dark' ? alpha(systemColors.gray[100], 0.08) : alpha(systemColors.gray[900], 0.04),
        selected: mode === 'dark' ? alpha(systemColors.blue[500], 0.16) : alpha(systemColors.blue[500], 0.08),
        disabled: mode === 'dark' ? systemColors.gray[700] : systemColors.gray[300],
        disabledBackground: mode === 'dark' ? alpha(systemColors.gray[700], 0.12) : alpha(systemColors.gray[300], 0.12),
      },
      divider: mode === 'dark' ? alpha(systemColors.gray[100], 0.08) : alpha(systemColors.gray[900], 0.08),
    },
    typography: {
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      fontFamilyMono: "'JetBrains Mono', 'SF Mono', 'Fira Code', Consolas, monospace",
      h1: {
        fontSize: '3.5rem',
        fontWeight: 700,
        lineHeight: 1.2,
        letterSpacing: '-0.02em',
      },
      h2: {
        fontSize: '2.75rem',
        fontWeight: 700,
        lineHeight: 1.2,
        letterSpacing: '-0.02em',
      },
      h3: {
        fontSize: '2.25rem',
        fontWeight: 700,
        lineHeight: 1.2,
        letterSpacing: '-0.02em',
      },
      h4: {
        fontSize: '1.875rem',
        fontWeight: 600,
        lineHeight: 1.2,
        letterSpacing: '-0.02em',
      },
      h5: {
        fontSize: '1.5rem',
        fontWeight: 600,
        lineHeight: 1.2,
        letterSpacing: '-0.01em',
      },
      h6: {
        fontSize: '1.125rem',
        fontWeight: 600,
        lineHeight: 1.2,
      },
      subtitle1: {
        fontSize: '1.125rem',
        fontWeight: 500,
        lineHeight: 1.5,
        letterSpacing: '-0.01em',
      },
      subtitle2: {
        fontSize: '0.875rem',
        fontWeight: 500,
        lineHeight: 1.5,
        letterSpacing: '-0.01em',
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.5,
        letterSpacing: '-0.01em',
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.5,
        letterSpacing: '-0.01em',
      },
      button: {
        fontSize: '0.875rem',
        fontWeight: 600,
        lineHeight: 1.5,
        letterSpacing: '-0.01em',
        textTransform: 'none',
      },
      caption: {
        fontSize: '0.75rem',
        fontWeight: 500,
        lineHeight: 1.5,
      },
      overline: {
        fontSize: '0.75rem',
        fontWeight: 600,
        lineHeight: 1.5,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
      },
    },
    shape: {
      borderRadius: 12,
    },
    mixins,
    shadows: [
      'none',
      `0px 1px 2px ${alpha(systemColors.gray[900], 0.08)}`,
      `0px 2px 4px ${alpha(systemColors.gray[900], 0.08)}`,
      `0px 4px 8px ${alpha(systemColors.gray[900], 0.08)}`,
      `0px 8px 16px ${alpha(systemColors.gray[900], 0.08)}`,
      `0px 16px 24px ${alpha(systemColors.gray[900], 0.08)}`,
      `0px 24px 32px ${alpha(systemColors.gray[900], 0.08)}`,
      // ... rest of the shadows
    ],
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          '*': {
            boxSizing: 'border-box',
            margin: 0,
            padding: 0,
          },
          html: {
            MozOsxFontSmoothing: 'grayscale',
            WebkitFontSmoothing: 'antialiased',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100%',
            width: '100%',
          },
          body: {
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            minHeight: '100%',
            width: '100%',
            scrollbarColor: mode === 'dark' 
              ? `${systemColors.blue[500]} ${systemColors.gray[900]}`
              : `${systemColors.blue[500]} ${systemColors.gray[100]}`,
            '&::-webkit-scrollbar': {
              width: 6,
              height: 6,
            },
            '&::-webkit-scrollbar-track': {
              background: mode === 'dark' ? systemColors.gray[900] : systemColors.gray[100],
              borderRadius: 8,
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: mode === 'dark' ? systemColors.blue[500] : systemColors.blue[400],
              borderRadius: 8,
              '&:hover': {
                backgroundColor: mode === 'dark' ? systemColors.blue[400] : systemColors.blue[500],
              },
            },
          },
          '#root': {
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            height: '100%',
            width: '100%',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 20,
            backgroundImage: 'none',
            '&:hover': {
              boxShadow: `0px 24px 48px ${alpha(systemColors.gray[900], mode === 'dark' ? 0.2 : 0.08)}`,
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
            fontWeight: 600,
            padding: '0.5rem 1rem',
            '&:hover': {
              boxShadow: 'none',
            },
          },
          contained: {
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
            },
          },
          containedPrimary: {
            backgroundImage: `linear-gradient(135deg, ${systemColors.blue[500]} 0%, ${systemColors.blue[600]} 100%)`,
            '&:hover': {
              backgroundImage: `linear-gradient(135deg, ${systemColors.blue[600]} 0%, ${systemColors.blue[700]} 100%)`,
            },
          },
          containedSecondary: {
            backgroundImage: `linear-gradient(135deg, ${systemColors.green[500]} 0%, ${systemColors.green[600]} 100%)`,
            '&:hover': {
              backgroundImage: `linear-gradient(135deg, ${systemColors.green[600]} 0%, ${systemColors.green[700]} 100%)`,
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundImage: 'none',
            ...mixins.glassmorphism(0.8, 20),
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            '&.Mui-selected': {
              backgroundColor: mode === 'dark' ? alpha(systemColors.blue[500], 0.16) : alpha(systemColors.blue[500], 0.08),
              '&:hover': {
                backgroundColor: mode === 'dark' ? alpha(systemColors.blue[500], 0.24) : alpha(systemColors.blue[500], 0.16),
              },
            },
          },
        },
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            minWidth: 40,
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          variant: 'outlined',
        },
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 8,
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            fontWeight: 500,
          },
        },
      },
    },
  };
};

export { getDesignTokens };
export default createTheme(getDesignTokens('dark'));