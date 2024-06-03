'use client'
import { styled } from '@mui/material/styles';
import { Box, Card, CardMedia } from '@mui/material';

/**
 * Root container styled component.
 * @type {import('@mui/material').StyledComponent<typeof Box, {}, {}>}
 */
export const RootContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
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