'use client'
import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Grid, Typography, TextField, Button, Card, Paper } from '@mui/material';

const StyledAdmin = {
  RootContainer: styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  })),
  HeaderBox: styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    display: 'flex',  
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  })),
  ContentBox: styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    flex: 1,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
  })),
  SideBarBox: styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    width: '250px',
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  })),
  OrderListGrid: styled(Grid)(({ theme }) => ({
    marginTop: theme.spacing(2),
  })),
  OrdersGrid: styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(2),
  })),
  StyledCard: styled(Card)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
  })),
  OrderBox: styled(Box)(({ theme }) => ({
    width: '280px',
    display: 'flex',
    flexDirection: 'column',
  })),
  ItemBox: styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    marginTop: theme.spacing(1),
  })),
};

export default StyledAdmin;
