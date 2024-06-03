'use client'
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { CardActionArea, Typography, CardContent, Card, Box, Button } from '@mui/material';
import { RootMenuBox, SideBox, MainMenuBox, StyledCard, StyledCardMedia, CategoryBox } from '@/components/styles/StyledMenuScreen';
import Fade from '@mui/material/Fade';

/**
 * Functional component for the menu screen.
 * @returns {JSX.Element} JSX representation of the menu screen.
 */
export default function MenuScreen() {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [displayedItems, setDisplayedItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [categories, setCategories] = useState([]);

  /**
   * Fetches items from the catalogue API and sets them to the state.
   */
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('/api/catalogue');
        const data = await response.json();
        console.log("Items set");
        setItems(data);
        setDisplayedItems(data);

        const uniqueCategories = ['All', ...new Set(data.map(item => item.category))];
        setCategories(uniqueCategories);

      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  /**
   * Handles the click event for an item, updating the selected items and total price.
   *
   * @param {Object} item - The item that was clicked.
   * @param {number} item.id - The unique ID of the item.
   * @param {string} item.name - The name of the item.
   * @param {string} item.image - The image URL of the item.
   * @param {number} item.price - The price of the item.
   */
  const handleItemClick = useCallback((item) => {
    const existingItemIndex = selectedItems.findIndex((prevItem) => prevItem.id === item.id);
    if (existingItemIndex !== -1) {
      // If the item already exists in the selectedItems array, increment its quantity by 1
      const updatedItems = [...selectedItems];
      updatedItems[existingItemIndex].quantity += 1;
      setSelectedItems(updatedItems);
    } else {
      // If the item doesn't exist, add it with a quantity of 1
      const newItem = { ...item, quantity: 1 };
      setSelectedItems([...selectedItems, newItem]);
    }
    setTotalPrice((prevTotal) => parseFloat((prevTotal + item.price).toFixed(2)));
  }, [selectedItems]);
  
  

  /**
   * Handles the checkout process, navigating to the checkout page with selected items and total price.
   */
  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      alert('Please select items before going to checkout.');
      return;
    }

    const stringifiedItems = JSON.stringify(selectedItems);
    router.push(`/checkout?items=${stringifiedItems}&totalPrice=${totalPrice}`);
  };

  /**
   * Handles the category click event, updating the displayed items based on the selected category.
   *
   * @param {string} category - The category that was clicked.
   */
  const handleCategoryClick = (category) => {
    if (category === 'All') {
      setDisplayedItems(items);
    } else {
      const filteredItems = items.filter(item => item.category === category);
      setDisplayedItems(filteredItems);
    }
  };

  return (
    <Fade in={true} timeout={200}>
      <RootMenuBox>
        <SideBox>
          <Box>
            <Typography variant="h6" align="center">
              Categories
            </Typography>
            <Box display="flex" flexDirection="column" alignItems="center" mt="2%">
              {categories.map((category, index) => (
                <CategoryBox key={index} onClick={() => handleCategoryClick(category)}>
                  {category}
                </CategoryBox>
              ))}
            </Box>
          </Box>
          <Box>
            <Typography variant="h6" align="center">
              Selected Items
            </Typography>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {selectedItems.map((item, index) => (
                <li key={index} style={{ marginBottom: '1%' }}>
                  {item.name} {item.quantity > 1 && `x${item.quantity}`} - ${item.price}
                </li>
              ))}
            </ul>
            <Typography variant="h6" align="center">
              Total Price: ${totalPrice.toFixed(2)}
            </Typography>
            <Box display="flex" justifyContent="center" mt="2%" >
              <Button variant="contained" color="primary" onClick={handleCheckout} disabled={selectedItems.length === 0}>
                Go to Checkout
              </Button>
            </Box>
          </Box>
        </SideBox>

        <MainMenuBox>
          {displayedItems.map((item) => (
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
      </RootMenuBox>
    </Fade>
  );
}
