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
    marginBottom: theme.spacing(1),
  })),
  OrderBox: styled(Card)(({ theme }) => ({
    width: '289px',
    display: 'flex',
    flexDirection: 'column',
    border: '2px solid grey',
    padding: theme.spacing(1),
    maxHeight: '360px',
    alignItems: 'left'
  })),
  ItemList: styled(Box)(({ theme }) => ({
    maxHeight: '90px',
    overflow: 'auto' 
  })),
  ButtonBox: styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
  })),
  Modal: styled(Paper)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    boxShadow: 24,
    padding: theme.spacing(2)
  })),
};

export default StyledAdmin;
