'use client';
import { createTheme } from '@mui/material';

/**
 * Global theme configuration for the entire project.
 * @type {import('@mui/material').Theme}
 */
const theme = createTheme({
  typography: {
    fontFamily: 'Roboto',
    h1: { fontWeight: 'bold' },
    h2: {
      fontSize: '2rem',
      color: 'black',
    },
    h2white: {
      fontSize: '2rem',
      color: 'white',
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 'bold'
    },
  },
  palette: {
    primary: {
      main: '#212121', // Dark grey
      contrastText: '#FFFFFF', // White
    },
    secondary: {
      main: '#F48FB1', // Light pink
      contrastText: '#121212', // Black
    },
  },
});

export default theme;