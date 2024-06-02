'use client'
import React, { useState, useEffect } from 'react';
import { CardActionArea, Typography, CardContent, Card } from '@mui/material';
import { RootMenuBox, SideBox, MainMenuBox, StyledCard, StyledCardMedia } from './styles';
import Link from 'next/link';
import Fade from '@mui/material/Fade';

/**
 * Functional component for the menu screen.
 * @returns {JSX.Element} JSX representation of the menu screen.
 */
export default function MenuScreen() {
  const [items, setItems] = useState([]);

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

  return (
    <Card>
      <Link href="/" passHref>
        <CardActionArea>
          <Fade in={true} timeout={200}>
            <RootMenuBox>
              <SideBox>
                {/* Side content */}
              </SideBox>
              <MainMenuBox>
                {items.map(item => (
                  <StyledCard key={item.id}>
                    <CardActionArea>
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
            </RootMenuBox>
          </Fade>
        </CardActionArea>
      </Link>
    </Card>
  );
}