'use client';
import React, { useState } from 'react';
import {
  Typography,
  IconButton,
  Toolbar,
  AppBar,
  TextField,
  Button,
  Grid,
  Box,
  CardActionArea
} from '@mui/material';
import { AddCircleOutline, Menu } from '@mui/icons-material';
import StyledAdmin from '@/components/styles/StyledAdmin';
import OrderDetailsModal from './orderDetailsModal';
import useFetchOrders from '@/hooks/useFetchOrders';

/**
 * Functional component for the admin dashboard, focused on adding new items.
 * @returns {JSX.Element} JSX representation of the admin dashboard (add new item section).
 */
export default function AdminDashboard() {
  const [newItem, setNewItem] = useState({ name: '', price: '', category: '', image: '' });
  const orders = useFetchOrders();
  
  const handleNewItemChange = (event) => {
    setNewItem({ ...newItem, [event.target.name]: event.target.value });
  };

  const handleAddNewItem = async (event) => {
    event.preventDefault();

    // Prepare item data to send (ensure price is a number)
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

  /**
   * Utility function to truncate card number and replace all but the last four digits with asterisks.
   * @param {string} cardNumber - The card number to format.
   * @returns {string} - The formatted card number.
   */
  const formatCardNumber = (cardNumber) => {
    return cardNumber.slice(0, -4).replace(/\d/g, '*') + cardNumber.slice(-4);
  };

  /**
   * Calculate the total price of all items within an order.
   * @param {Array} items - The items within the order.
   * @returns {number} - The total price.
   */
  const calculateTotalPrice = (items) => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  /**
   * State hook to manage the open state of the modal.
   * @type {[boolean, React.Dispatch<React.SetStateAction<boolean>>]}
   */
  const [open, setOpen] = useState(false);

  /**
   * State hook to manage the currently selected order.
   * @type {[Object|null, React.Dispatch<React.SetStateAction<Object|null>>]}
   */
  const [selectedOrder, setSelectedOrder] = useState(null);

  /**
   * Handles opening the modal by setting the selected order and open state.
   * @param {Object} order - The order to be displayed in the modal.
   */
  const handleOpen = (order) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  /**
   * Handles closing the modal by resetting the open state and selected order.
   */
  const handleClose = () => {
    setOpen(false);
    setSelectedOrder(null);
  };

  return (
    <StyledAdmin.RootContainer>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <Menu />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            Furniture Store Admin
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container spacing={2} sx={{ padding: 2 }}>
        <Grid item xs={12}>
          <Typography variant="h5">Add New Item</Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Name"
            name="name"
            value={newItem.name}
            onChange={handleNewItemChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Price"
            name="price"
            type="number"
            value={newItem.price}
            onChange={handleNewItemChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Category"
            name="category"
            value={newItem.category}
            onChange={handleNewItemChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Image URL"
            name="image"
            value={newItem.image}
            onChange={handleNewItemChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddNewItem}
            endIcon={<AddCircleOutline />}
          >
            Add New Item
          </Button>
        </Grid>
      </Grid>
      
      <Grid container spacing={2} sx={{ padding: 2 }}>
        {orders.map((order) => (
          <StyledAdmin.OrdersGrid item xs={12} ml={4} key={order.id}>
            <CardActionArea onClick={() => handleOpen(order)} disabled={order.fulfilled}>
              <StyledAdmin.OrderBox>
                <Typography variant="h5">
                  Fulfilled: {order.fulfilled ? 'Yes' : 'No'}
                </Typography>
                <Typography variant="body1">
                  Tracking Number: {order.trackingNo ? order.trackingNo : ''}
                </Typography>
                <Typography variant="h5">Order ID: {order.id}</Typography>
                <Typography variant="body1">Card Number: {formatCardNumber(order.cardNumber)}</Typography>
                <Typography variant="body1">Name: {order.name}</Typography>
                <Typography variant="body1">Phone: {order.phone}</Typography>
                <Typography variant="body1">Email: {order.email}</Typography>
                <Typography variant="body1">Created At: {order.createdAt}</Typography>
                <Typography variant="h6">Items:</Typography>
                <StyledAdmin.ItemList>
                  {order.items.map((item) => (
                    <Box key={item.id}>
                      <Typography variant="body2">
                        {item.name} - Quantity: {item.quantity} - Price: ${item.price * item.quantity}
                      </Typography>
                    </Box>
                  ))}
                </StyledAdmin.ItemList>
                <Typography variant="h6">Total Price: ${calculateTotalPrice(order.items).toFixed(2)}</Typography>
                <StyledAdmin.ButtonBox>
                  <Box color='green'>{order.fulfilled ? 'Fulfilled' : 'Tap to fulfill'}</Box>
                </StyledAdmin.ButtonBox>
              </StyledAdmin.OrderBox>
            </CardActionArea>
          </StyledAdmin.OrdersGrid>
        ))}
      </Grid>
      
      <OrderDetailsModal open={open} handleClose={handleClose} order={selectedOrder} />
    </StyledAdmin.RootContainer>
  );
}