'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter hook
import { CardActionArea, Typography, CardContent, Card, Box, Button } from '@mui/material';
import { RootMenuBox, SideBox, MainMenuBox, StyledCard, StyledCardMedia } from './styles';
import Link from 'next/link';
import Fade from '@mui/material/Fade';

/**
 * Functional component for the menu screen.
 * @returns {JSX.Element} JSX representation of the menu screen.
 */
export default function MenuScreen() {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('/api/catalogue');
        const data = await response.json();
        console.log("Items set");
        setItems(data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  const handleItemClick = (item) => {
    setSelectedItems((prevItems) => {
      const existingItem = prevItems.find((prevItem) => prevItem.id === item.id);
      if (existingItem) {
        console.log('Existing Item:', existingItem);
        existingItem.quantity += 1;
        console.log('Updated Items:', prevItems);
        return [...prevItems];
      } else {
        const newItem = { ...item, quantity: 1 };
        console.log('New Item:', newItem);
        return [...prevItems, newItem];
      }
    });
    setTotalPrice((prevTotal) => parseFloat((prevTotal + item.price).toFixed(2)));
  };

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      alert('Please select items before going to checkout.');
      return;
    }

    const stringifiedItems = JSON.stringify(selectedItems);
    router.push(`/checkout?items=${stringifiedItems}&totalPrice=${totalPrice}`);
  };

  return (
    <Card>
      <Fade in={true} timeout={200}>
        <RootMenuBox>
          <SideBox>
            {/* Side content */}
          </SideBox>
          <MainMenuBox>
            {items.map((item) => (
              <StyledCard key={item.id}>
                <CardActionArea onClick={() => handleItemClick(item)}>
                  <StyledCardMedia image={item.image} title={item.name} />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      ${item.price}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </StyledCard>
            ))}
          </MainMenuBox>
          <SideBox>
            <Box>
              <Typography variant="h6" align="center">
                Selected Items
              </Typography>
              <ul>
                {selectedItems.map((item, index) => (
                  <li key={index}>
                    {item.name} {item.quantity > 1 && `x${item.quantity}`} - ${item.price}
                  </li>
                ))}
              </ul>
              <Typography variant="h6" align="center">
                Total Price: ${totalPrice.toFixed(2)}
              </Typography>
              <Button variant="contained" color="primary" onClick={handleCheckout}>
                Go to Checkout
              </Button>
            </Box>
          </SideBox>
        </RootMenuBox>
      </Fade>
    </Card>
  );
}
