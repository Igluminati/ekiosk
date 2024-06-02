'use client'
import React, { useState, useEffect } from 'react';
import { Card, CardActionArea, Typography } from '@mui/material';
import { RootMenuBox, SideBox, MainMenuBox } from './styles';
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
                <Typography variant="h1">
                <ul>
                  {items.map(item => (
                    <li key={item.id}>
                      {item.name} - ${item.price} - ${item.image}
                    </li>
                  ))}
                </ul>
                </Typography>
              </MainMenuBox>
            </RootMenuBox>
          </Fade>
        </CardActionArea>
      </Link>
    </Card>
  );
}