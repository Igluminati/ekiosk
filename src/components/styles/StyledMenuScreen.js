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
  flex: '1',
  overflowY: 'auto',
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
  flex: 2.5,
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  overflow: 'auto',
  gap: theme.spacing(2),
  padding: theme.spacing(1),
  color: theme.palette.primary.contrastText,
}));

/**
* Card container styled component to ensure consistent sizing.
* @type {import('@mui/material').StyledComponent<typeof Card, {}, {}>}
*/
export const StyledCard = styled(Card)(({ theme }) => ({
  width: '280px',
  justifyContent: "center",
  marginTop: theme.spacing(2),
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

/**
* Category box styled component to create touchable, centered, and column-displayed boxes for categories.
* @type {import('@mui/material').StyledComponent<typeof Box, {}, {}>}
*/
export const CategoryBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  margin: theme.spacing(1),
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.contrastText,
  cursor: 'pointer',
  textAlign: 'center',
  width: '75%',
  borderRadius: theme.shape.borderRadius,
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
  },
}));
