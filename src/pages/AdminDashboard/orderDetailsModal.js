import React, { useState } from 'react';
import { Modal, Grid, Typography, Button, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import StyledAdmin from '@/components/styles/StyledAdmin';

/**
 * Component to display the details of a selected order in a modal.
 * @param {Object} props - The props for the component.
 * @param {boolean} props.open - Determines if the modal is open.
 * @param {function} props.handleClose - Function to handle closing the modal.
 * @param {Object} [props.order] - The order details to be displayed.
 * @returns {JSX.Element|null} - The JSX representation of the order details modal.
 */
const OrderDetailsModal = ({ open, handleClose, order }) => {
  const [trackingNo, setTrackingNo] = useState('');

  const handleTrackingNumberChange = (event) => {
    setTrackingNo(event.target.value);
  };

  const calculateTotalPrice = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const formatCardNumber = (cardNumber) => {
    return cardNumber.slice(0, -4).replace(/\d/g, '*') + cardNumber.slice(-4);
  };

  const uploadTrackingNumber = async () => {
    console.log("Tracking number:", trackingNo);
    console.log("orderID:", order.id);
    const data = { orderId: order.id, trackingNo: trackingNo }; // Ensure both orderId and trackingNo are included
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to upload tracking number: ${response.statusText}`);
      }
  
      console.log('Tracking number uploaded successfully!');
      setTrackingNo('');
    } catch (error) {
      console.error('Error uploading tracking number:', error);
    }
    
  };  

  if (!order) return null;

  const totalPrice = calculateTotalPrice(order.items);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="order-details-modal-title"
      aria-describedby="order-details-modal-description"
    >
      <StyledAdmin.Modal>
        <Typography id="order-details-modal-title" variant="h6" component="h2">
          Order Details
        </Typography>
        <Typography id="order-details-modal-description" sx={{ mt: 2 }}>
          Order ID: {order.id}
        </Typography>
        <Typography>Card Number: {formatCardNumber(order.cardNumber)}</Typography>
        <Typography>Name: {order.name}</Typography>
        <Typography>Phone: {order.phone}</Typography>
        <Typography>Email: {order.email}</Typography>
        <Typography>Created At: {order.createdAt}</Typography>
        <Typography variant="h6">Items:</Typography>
        {order.items.map((item) => (
          <Typography key={item.id} variant="body2">
            {item.name} - Quantity: {item.quantity} - Price: ${(item.price * item.quantity).toFixed(2)}
          </Typography>
        ))}
        <Typography variant="h6">Total Price: ${totalPrice}</Typography>
        <Grid mt={2} mb={2}>
          <TextField
            label="Tracking Number"
            name="tracking"
            value={trackingNo}
            onChange={handleTrackingNumberChange}
            fullWidth
          />
        </Grid>
        <StyledAdmin.ButtonBox>
          <Button variant="contained" color="success" onClick={uploadTrackingNumber}>Fulfill</Button>
        </StyledAdmin.ButtonBox>
      </StyledAdmin.Modal>
    </Modal>
  );
};

OrderDetailsModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  order: PropTypes.object,
};

export default OrderDetailsModal;
