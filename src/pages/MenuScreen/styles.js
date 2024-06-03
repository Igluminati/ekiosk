'use client'
import { styled } from '@mui/material/styles';
import { Box, Card, CardMedia } from '@mui/material';

/**
* Root menu container styled component.
* @type {import('@mui/material').StyledComponent<typeof Box, {}, {}>}
*/
export const RootMenuBox = styled(Box)(({ theme }) => ({
  height: '100vh',
  display: 'flex',
  flexDirection: 'row',
  backgroundImage: `url(images/background-image.png)`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
}));

/**
* Side container styled component.
* @type {import('@mui/material').StyledComponent<typeof Box, {}, {}>}
*/
export const SideBox = styled(Box)(({ theme }) => ({
  justifyContent: 'center',
  alignItems: 'top',
  textAlign: 'top',
  flex: 1.5,
  overflow: 'auto',
  display: 'flex',
  flexDirection: 'row',
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
}));

/**
* Main menu container styled component.
* @type {import('@mui/material').StyledComponent<typeof Box, {}, {}>}
*/
export const MainMenuBox = styled(Box)(({ theme }) => ({
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  textAlign: 'left',
  flex: 8.5,
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  color: theme.palette.primary.contrastText,
}));

/**
* Card container styled component to ensure consistent sizing.
* @type {import('@mui/material').StyledComponent<typeof Card, {}, {}>}
*/
export const StyledCard = styled(Card)(({ theme }) => ({
  width: '280px',
  display: 'flex',
  flexDirection: 'column',
}));

/**
* Card media styled component to ensure consistent image sizing.
* @type {import('@mui/material').StyledComponent<typeof CardMedia, {}, {}>}
*/
export const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: '200px',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}));