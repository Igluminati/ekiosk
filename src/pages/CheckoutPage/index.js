'use client'
import React, { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Box, CardContent, Typography } from '@mui/material';
import { StyledCard, StyledCardMedia } from './styles';

export default function CheckoutPage() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [processedItems, setProcessedItems] = useState([]);

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

  if (processedItems.length === 0) {
    return null;
  }

  return (
    <Box display="flex" flexWrap="wrap" justifyContent="center" alignItems="center">
      {processedItems.map((item, index) => (
        <StyledCard key={item.id}>
            <StyledCardMedia image={item.image} title={item.name} />
                <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {item.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    ${item.price}
                </Typography>
            </CardContent>
        </StyledCard>
      ))}
    </Box>
  );
}
