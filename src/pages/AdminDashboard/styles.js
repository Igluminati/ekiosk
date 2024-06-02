'use client';
import { styled } from '@mui/material/styles';
import { Box, Grid, Typography, TextField, Button } from '@mui/material';

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

/**
 * Order ListItem styled component.
 * @type {import('@mui/material').StyledComponent<typeof Box, {}, {}>}
 */
export const OrderListItemBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  marginBottom: theme.spacing(1),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
}));
