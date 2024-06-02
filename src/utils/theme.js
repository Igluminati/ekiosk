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
      main: '#EEEEEE',
      contrastText: '#FEE715B0',
    },
    secondary: {
      main: '#101820C0',
      contrastText: '#ffffff',
    },
  },
});

export default theme;