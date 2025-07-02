import { createTheme } from '@mui/material/styles';

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      main: '#2D3436',
      light: '#636E72',
      dark: '#1E272E',
      contrastText: '#fff',
    },
    secondary: {
      main: '#00B894',
      light: '#55EFC4',
      dark: '#00A885',
      contrastText: '#fff',
    },
    background: {
      default: mode === 'dark' ? '#1A1D1E' : '#F8F9FA',
      paper: mode === 'dark' ? '#2D3436' : '#FFFFFF',
    },
    text: {
      primary: mode === 'dark' ? '#F8F9FA' : '#2D3436',
      secondary: mode === 'dark' ? '#A0A4A6' : '#636E72',
    },
    error: {
      main: '#FF7675',
    },
    success: {
      main: '#00B894',
    },
    divider: mode === 'dark' ? 'rgba(248, 249, 250, 0.12)' : 'rgba(0, 0, 0, 0.12)',
  },
  typography: {
    fontFamily: "'Beatrice', Helvetica, 'Helvetica Neue', Arial, sans-serif",
    fontFamilySerif: "'New Kansas', 'Times New Roman', serif",
    fontWeightThin: 100,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightSemibold: 600,
    h1: {
      fontFamily: "'New Kansas', 'Times New Roman', serif",
      fontWeight: 400,
      fontSize: '4rem',
      letterSpacing: 0,
      lineHeight: '110%',
    },
    h2: {
      fontFamily: "'New Kansas', 'Times New Roman', serif",
      fontWeight: 400,
      fontSize: '2.4rem',
      letterSpacing: 0,
      lineHeight: '110%',
    },
    h3: {
      fontFamily: "'New Kansas', 'Times New Roman', serif",
      fontWeight: 400,
      fontSize: '2rem',
      letterSpacing: 0,
      lineHeight: '130%',
    },
    h4: {
      fontFamily: "'Beatrice', Helvetica, 'Helvetica Neue', Arial, sans-serif",
      fontWeight: 600,
      fontSize: '1.6rem',
      letterSpacing: '-0.02rem',
      lineHeight: '150%',
    },
    h5: {
      fontFamily: "'Beatrice', Helvetica, 'Helvetica Neue', Arial, sans-serif",
      fontWeight: 600,
      fontSize: '1.4rem',
      letterSpacing: '-0.02rem',
      lineHeight: '160%',
    },
    h6: {
      fontFamily: "'Beatrice', Helvetica, 'Helvetica Neue', Arial, sans-serif",
      fontWeight: 600,
      fontSize: '1.2rem',
      letterSpacing: 0,
      lineHeight: '150%',
    },
    body1: {
      fontFamily: "'Beatrice', Helvetica, 'Helvetica Neue', Arial, sans-serif",
      fontSize: '1.2rem',
      letterSpacing: 0,
      lineHeight: '150%',
      fontWeight: 400,
    },
    body2: {
      fontFamily: "'Beatrice', Helvetica, 'Helvetica Neue', Arial, sans-serif",
      fontSize: '1rem',
      letterSpacing: 0,
      lineHeight: '150%',
      fontWeight: 400,
    },
    button: {
      fontFamily: "'Beatrice', Helvetica, 'Helvetica Neue', Arial, sans-serif",
      textTransform: 'none',
      fontWeight: 600,
      fontSize: '1.2rem',
      letterSpacing: 0,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '@font-face': [
          {
            fontFamily: 'New Kansas',
            fontStyle: 'normal',
            fontDisplay: 'swap',
            fontWeight: 400,
          },
          {
            fontFamily: 'Beatrice',
            fontStyle: 'normal',
            fontDisplay: 'swap',
            fontWeight: 400,
          },
          {
            fontFamily: 'Beatrice',
            fontStyle: 'normal',
            fontDisplay: 'swap',
            fontWeight: 600,
          },
        ],
        html: {
          fontSize: '62.5%',
        },
        body: {
          fontSize: '1.4rem',
          fontFamily: "'Beatrice', Helvetica, 'Helvetica Neue', Arial, sans-serif",
          lineHeight: '160%',
          scrollbarColor: mode === 'dark' ? '#00B894 #1A1D1E' : '#00B894 #F8F9FA',
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            width: 10,
          },
          '&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track': {
            background: mode === 'dark' ? '#1A1D1E' : '#F8F9FA',
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 8,
            backgroundColor: '#00B894',
            minHeight: 24,
            border: mode === 'dark' ? '3px solid #1A1D1E' : '3px solid #F8F9FA',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '1rem 2.4rem',
          fontWeight: 600,
          fontSize: '1.2rem',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          transition: 'all 0.3s ease-in-out',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: '2.4rem',
          paddingRight: '2.4rem',
        },
      },
    },
  },
});

const theme = createTheme(getDesignTokens('dark')); // Default to dark mode

export { getDesignTokens };
export default theme;