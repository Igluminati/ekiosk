'use client'
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

/**
* Root menu container styled component.
* @type {import('@mui/material').StyledComponent<typeof Box, {}, {}>}
*/
export const RootMenuBox = styled(Box)(({ theme }) => ({
height: '100vh',
display: 'flex',
flexDirection: 'row',
backgroundImage: `url(images/background-image.png)`,
backgroundRepeat: "no-repeat",
backgroundSize: "cover",
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
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  flex: 8.5,
  overflow: 'auto',
  display: 'flex',
  flexDirection: 'row',
  color: theme.palette.primary.contrastText,
}));
