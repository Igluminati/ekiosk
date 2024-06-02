'use client';
import React, { useState } from 'react';
import {
  Card,
  CardActionArea,
  Typography,
  IconButton,
  Toolbar,
  AppBar,
  TextField,
  Button,
  Grid,
} from '@mui/material';
import { AddCircleOutline, Menu } from '@mui/icons-material';

/**
 * Functional component for the admin dashboard, focused on adding new items.
 * @returns {JSX.Element} JSX representation of the admin dashboard (add new item section).
 */
export default function AdminDashboard() {
  /**
   * State object to hold information about the new item being added.
   * @typedef {Object} NewItem
   * @property {string} name - Name of the new item.
   * @property {number} price - Price of the new item.
   * @property {string} category - Category of the new item.
   * @property {string} image - Image URL of the new item.
   */
  const [newItem, setNewItem] = useState({ name: '', price: '', category: '', image: '' });

  /**
   * Handles changes to the form fields for the new item.
   * @param {React.ChangeEvent<HTMLInputElement>} event - The change event object.
   * @returns {void}
   */
  const handleNewItemChange = (event) => {
    setNewItem({ ...newItem, [event.target.name]: event.target.value });
  };

  /**
   * Handles the submission of the "Add New Item" form.
   * (Currently a placeholder function, needs implementation to send a POST request)
   * @param {React.FormEvent<HTMLFormElement>} event - The form submission event object.
   * @returns {Promise<void>} A promise that resolves when the asynchronous operation is complete.
   */
  const handleAddNewItem = async (event) => {
    event.preventDefault();

    // Prepare item data to send (implementation omitted for brevity)

    try {
      // Send POST request to add new item (implementation omitted for brevity)

      console.log('New item added successfully!');
      setNewItem({ name: '', price: '', category: '', image: '' });
    } catch (error) {
      console.error('Error adding new item:', error);
    }
  };

  return (
    <Card>
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
          <Button variant="contained" color="primary" onClick={handleAddNewItem} endIcon={<AddCircleOutline />}>
            Add New Item
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
}