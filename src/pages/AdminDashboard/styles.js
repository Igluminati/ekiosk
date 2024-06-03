'use client';
import { styled } from '@mui/material/styles';
import { Box, Grid, Typography, TextField, Button, Card, Paper } from '@mui/material';

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
 * Header styled component.
 * @type {import('@mui/material').StyledComponent<typeof Box, {}, {}>}
 */
export const HeaderBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

/**
 * Content container styled component.
 * @type {import('@mui/material').StyledComponent<typeof Box, {}, {}>}
 */
export const ContentBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  flex: 1,
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
}));

/**
 * Sidebar styled component.
 * @type {import('@mui/material').StyledComponent<typeof Box, {}, {}>}
 */
export const SideBarBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  width: '250px',
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
}));

/**
 * Order List styled component.
 * @type {import('@mui/material').StyledComponent<typeof Grid, {}, {}>}
 */
export const OrderListGrid = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

export const OrdersGrid = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
}));

/**
* OrderBox styled component.
* @type {import('@mui/material').StyledComponent<typeof Box, {}, {}>}
*/
export const OrderBox = styled(Box)(({ theme }) => ({
  width: '280px',
  display: 'flex',
  flexDirection: 'column',
}));

export const ItemBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  marginTop: theme.spacing(1),
}));