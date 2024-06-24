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

/**
 * AdminDashboard component for managing orders and adding new items.
 * 
 * This component provides an interface for administrators to view and manage orders
 * and to add new items to the catalogue. It uses a toolbar with a menu to switch
 * between the "Orders" view and the "Items" view.
 * 
 * @component
 * @returns {JSX.Element} The rendered admin dashboard component.
 */
export default function AdminDashboard() {
  const [newItem, setNewItem] = useState({ name: '', price: '', category: '', image: '' });
  const [view, setView] = useState('orders'); 
  const orders = useFetchOrders();

  /**
   * Handle input changes for the new item form.
   * 
   * @param {React.ChangeEvent<HTMLInputElement>} event - The change event.
   */
  const handleNewItemChange = (event) => {
    setNewItem({ ...newItem, [event.target.name]: event.target.value });
  };

  /**
   * Handle form submission for adding a new item.
   * 
   * @param {React.FormEvent<HTMLFormElement>} event - The form submission event.
   */
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

  /**
   * Format the card number by masking all but the last four digits.
   * 
   * @param {string} cardNumber - The card number to format.
   * @returns {string} The formatted card number.
   */
  const formatCardNumber = (cardNumber) => {
    return cardNumber.slice(0, -4).replace(/\d/g, '*') + cardNumber.slice(-4);
  };

  /**
   * Calculate the total price of items in an order.
   * 
   * @param {Array<Object>} items - The items in the order.
   * @returns {number} The total price of the items.
   */
  const calculateTotalPrice = (items) => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  /**
   * Handle opening the order details modal.
   * 
   * @param {Object} order - The order to display in the modal.
   */
  const handleOpen = (order) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  /**
   * Handle closing the order details modal.
   */
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
