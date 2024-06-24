'use client';

import React, { useState } from 'react';
import {
  Typography,
  IconButton,
  Toolbar,
  AppBar,
  Box,
  CardActionArea,
  MenuItem,
  Button,
  Menu
} from '@mui/material';
import Link from 'next/link';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Image from 'next/image';
import StyledAdmin from '@/components/styles/StyledAdmin';
import OrderDetailsModal from '../../components/admin/OrderDetailsModal';
import AddNewItemForm from '../../components/admin/AddNewItemForm';
import OrderGrid from '../../components/admin/OrderGrid';
import useFetchOrders from '@/hooks/useFetchOrders';
import happyCenterAdminImage from '/public/images/happy_center_admin.png';

export default function AdminDashboard() {
  const [newItem, setNewItem] = useState({ name: '', price: '', category: '', image: '' });
  const [view, setView] = useState('orders'); 
  const orders = useFetchOrders();

  const handleNewItemChange = (event) => {
    setNewItem({ ...newItem, [event.target.name]: event.target.value });
  };

  const handleAddNewItem = async (event) => {
    event.preventDefault();

    const data = {
      ...newItem,
      price: parseFloat(newItem.price),
    };

    try {
      const response = await fetch('/api/catalogue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Failed to add new item: ${response.statusText}`);
      }

      console.log('New item added successfully!');
      setNewItem({ name: '', price: '', category: '', image: '' });
    } catch (error) {
      console.error('Error adding new item:', error);
    }
  };

  const formatCardNumber = (cardNumber) => {
    return cardNumber.slice(0, -4).replace(/\d/g, '*') + cardNumber.slice(-4);
  };

  const calculateTotalPrice = (items) => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleOpen = (order) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedOrder(null);
  };

  return (
    <StyledAdmin.RootContainer>
      <AppBar position="static">
        <Toolbar variant="dense">
          <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
              <React.Fragment>
                <Button variant="contained" {...bindTrigger(popupState)}>
                  {view}
                </Button>
                <Menu {...bindMenu(popupState)}>
                  <MenuItem onClick={() => { setView('orders'); popupState.close(); }}>Orders</MenuItem>
                  <MenuItem onClick={() => { setView('items'); popupState.close(); }}>Items</MenuItem>
                </Menu>
              </React.Fragment>
            )}
          </PopupState>
          <Box component="div" sx={{ flexGrow: 1 }}>
            <Image src={happyCenterAdminImage} alt="Happy Center Admin" width={200} height={50} style={{marginLeft:12}} />
          </Box>
        </Toolbar>
      </AppBar>

      {view === 'orders' ? (
        <OrderGrid
          orders={orders}
          handleOpen={handleOpen}
          formatCardNumber={formatCardNumber}
          calculateTotalPrice={calculateTotalPrice}
        />
      ) : (
        <AddNewItemForm
          newItem={newItem}
          handleNewItemChange={handleNewItemChange}
          handleAddNewItem={handleAddNewItem}
        />
      )}
      
      <OrderDetailsModal open={open} handleClose={handleClose} order={selectedOrder} />
    </StyledAdmin.RootContainer>
  );
}
