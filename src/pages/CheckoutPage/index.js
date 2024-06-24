'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, CardContent, Typography, TextField, Button, Grid, Card } from '@mui/material';
import { StyledCard, StyledCardMedia, RootContainer } from '@/components/styles/StyledCheckoutPage';
import useProcessItems from '@/hooks/useProcessItems';
import QrCode2Icon from '@mui/icons-material/QrCode2';

/**
 * The CheckoutPage component handles the checkout process for items.
 * It retrieves item data from the URL, processes it, and provides a form for the user to enter payment details.
 *
 * @component
 * @returns {JSX.Element} The rendered checkout page component.
 */
export default function CheckoutPage() {
    const router = useRouter();
    const processedItems = useProcessItems();
    const [orderData, setOrderData] = useState({
        cardNumber: '',
        expiryDate: '',
        cvc: '',
        name: '',
        phone: '',
        email: ''
    });

    /**
     * Handles changes in the order data form fields.
     *
     * @param {React.ChangeEvent<HTMLInputElement>} event - The input change event.
     */
    const handleOrderDataChange = (event) => {
        setOrderData({ ...orderData, [event.target.name]: event.target.value });
    };

    const data = {
            ...orderData,
            items: processedItems,
            totalPrice: processedItems.reduce((acc, item) => acc + item.price, 0),
        };

    /**
     * Handles the checkout process by sending order data to the server.
     *
     * @returns {Promise<void>} A promise that resolves when the checkout is complete.
     */
    const handleCheckout = async () => {
        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`Failed to checkout: ${response.statusText}`);
            }

            console.log('Order placed successfully!');
            setOrderData({ cardNumber: '', expiryDate: '', cvc: '', name: '', phone: '', email: '' });
            router.push(`/`);
        } catch (error) {
            console.error('Error checking out:', error);
        }
    };

    return (
        <RootContainer>
            <Box display="flex" flexWrap="wrap" justifyContent="center">
                {processedItems.map((item, index) => (
                    <StyledCard key={index} style={{ margin: '10px', width: '300px' }}>
                        <StyledCardMedia image={item.image} title={item.name} />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {item.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Quantity: {item.quantity}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Price: {item.price.toString().replace('.', ',')} TL
                            </Typography>
                        </CardContent>
                    </StyledCard>
                ))}
            </Box>
            <Typography variant="h6" align="center">
              Total Price: {data.totalPrice.toFixed(2).toString().replace('.', ',')} TL
            </Typography>
            <Box display="flex" justifyContent="center" alignItems="center">
                <Card>
                    <CardContent>
                        <Typography variant="h5" align="center">Order Information</Typography>
                        <Grid container spacing={2}>
                            {/* Order information fields */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Card Number"
                                    name="cardNumber"
                                    value={orderData.cardNumber}
                                    onChange={handleOrderDataChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Expiry Date"
                                    name="expiryDate"
                                    value={orderData.expiryDate}
                                    onChange={handleOrderDataChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="CVC"
                                    name="cvc"
                                    value={orderData.cvc}
                                    onChange={handleOrderDataChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Name"
                                    name="name"
                                    value={orderData.name}
                                    onChange={handleOrderDataChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Phone"
                                    name="phone"
                                    value={orderData.phone}
                                    onChange={handleOrderDataChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Email"
                                    name="email"
                                    value={orderData.email}
                                    onChange={handleOrderDataChange}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                        
                    </CardContent>
                    <Box display="flex" justifyContent="center" alignItems="center" mt={2} mb={4}>
                        <Button variant="contained" color="primary" onClick={handleCheckout}>Checkout</Button>
                    </Box>       
                </Card>
            </Box>
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" mt={2}>
                <Typography variant="h6" align="center">
                    Or
                </Typography>
                <Button variant="contained" color="primary"><QrCode2Icon/> HappyPay</Button>
            </Box>
        </RootContainer>
    );
}