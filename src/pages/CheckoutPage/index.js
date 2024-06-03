'use client'
import React, { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Box, CardContent, Typography, TextField, Button, Grid, Card } from '@mui/material';
import { StyledCard, StyledCardMedia, RootContainer } from './styles';

/**
 * The CheckoutPage component handles the checkout process for items.
 * It retrieves item data from the URL, processes it, and provides a form for the user to enter payment details.
 *
 * @component
 * @returns {JSX.Element} The rendered checkout page component.
 */
export default function CheckoutPage() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [processedItems, setProcessedItems] = useState([]);
    const [orderData, setOrderData] = useState({
        cardNumber: '',
        expiryDate: '',
        cvc: '',
        name: '',
        phone: '',
        email: '',
    });

    /**
     * Effect hook to process items and total price from URL search parameters.
     */
    useEffect(() => {
        const url = `${pathname}?${searchParams}`;
        console.log(url);

        const itemsString = searchParams.get('items');
        const totalPriceString = searchParams.get('totalPrice');

        if (itemsString && totalPriceString) {
            try {
                const selectedItems = JSON.parse(decodeURIComponent(itemsString));

                const processedItemsData = selectedItems.map((item) => ({
                    name: item.name,
                    quantity: item.quantity,
                    image: item.image,
                    price: item.price,
                }));

                setProcessedItems(processedItemsData);
                console.log('Processed Items:', processedItemsData);
            } catch (error) {
                console.error('Error parsing items:', error);
            }
        }
    }, [pathname, searchParams]);

    /**
     * Handles changes in the order data form fields.
     *
     * @param {React.ChangeEvent<HTMLInputElement>} event - The input change event.
     */
    const handleOrderDataChange = (event) => {
        setOrderData({ ...orderData, [event.target.name]: event.target.value });
    };

    /**
     * Handles the checkout process by sending order data to the server.
     *
     * @returns {Promise<void>} A promise that resolves when the checkout is complete.
     */
    const handleCheckout = async () => {
        const data = {
            ...orderData,
            items: processedItems,
            totalPrice: processedItems.reduce((acc, item) => acc + item.price, 0),
        };

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
            setOrderData({cardNumber: '', expiryDate: '', cvc: '', name: '', phone: '', email: '',});
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
                                Price: ${item.price}
                            </Typography>
                        </CardContent>
                    </StyledCard>
                ))}
            </Box>
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
                </Card>
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
                <Button variant="contained" color="primary" onClick={handleCheckout}>Checkout</Button>
            </Box>
        </RootContainer>
    );
}
