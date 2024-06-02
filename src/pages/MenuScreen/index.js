'use client'
import React, { useState, useEffect } from 'react';
import { CardActionArea, Typography, CardContent, Card, Box, Button } from '@mui/material';
import { RootMenuBox, SideBox, MainMenuBox, StyledCard, StyledCardMedia } from './styles';
import Link from 'next/link';
import Fade from '@mui/material/Fade';

/**
 * Functional component for the menu screen.
 * @returns {JSX.Element} JSX representation of the menu screen.
 */
export default function MenuScreen() {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('/api/catalogue');
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  const handleItemClick = (item) => {
    setSelectedItems(prevItems => {
      const existingItem = prevItems.find(prevItem => prevItem.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
        return [...prevItems];
      } else {
        item.quantity = 1;
        return [...prevItems, item];
      }
    });
    setTotalPrice(prevTotal => parseFloat((prevTotal + item.price).toFixed(2)));
  }

  return (
    <Card>
      <Fade in={true} timeout={200}>
        <RootMenuBox>
          <SideBox>
            {/* Side content */}
          </SideBox>
          <MainMenuBox>
            {items.map(item => (
              <StyledCard key={item.id}>
                <CardActionArea onClick={() => handleItemClick(item)}>
                  <StyledCardMedia
                    image={item.image}
                    title={item.name}
                  />
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
                  <li key={index}>{item.name} {item.quantity > 1 && `x${item.quantity}`} - ${item.price}</li>
                ))}
              </ul>
              <Typography variant="h6" align="center">
                Total Price: ${totalPrice.toFixed(2)}
              </Typography>
              <Box mt={2}>
                <Button variant="contained" color="primary">
                  Go to Checkout
                </Button>
              </Box>
            </Box>
          </SideBox>
        </RootMenuBox>
      </Fade>
    </Card>
  );
}