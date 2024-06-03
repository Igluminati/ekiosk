'use client'
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

/**
 * Large logo styled component.
 * @type {import('@mui/material').StyledComponent<'img', {}, {}>}
 */
export const LargeLogo = styled('img')({
  height: 50,
});

/**
* Root container styled component.
* @type {import('@mui/material').StyledComponent<typeof Box, {}, {}>}
*/
export const RootBox = styled(Box)(({ theme }) => ({
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
}));

/**
* Main container styled component.
* @type {import('@mui/material').StyledComponent<typeof Box, {}, {}>}
*/
export const MainBox = styled(Box)(({ theme }) => ({
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  flex: 9,
  overflow: 'auto',
  display: 'flex',
  flexDirection: 'column',
  color: theme.palette.primary.color,
}));

/**
* Secondary container styled component.
* @type {import('@mui/material').StyledComponent<typeof Box, {}, {}>}
*/
export const SecondBox = styled(Box)(({ theme }) => ({
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  display: 'flex',
  flex: 1,
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
}));