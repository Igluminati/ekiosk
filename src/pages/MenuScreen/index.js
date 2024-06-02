import React from 'react';
import { Card, CardActionArea, Typography } from '@mui/material';
import { RootMenuBox, SideBox, MainMenuBox } from './styles';
import Link from 'next/link';
import Fade from '@mui/material/Fade';

/**
 * Functional component for the menu screen.
 * @returns {JSX.Element} JSX representation of the menu screen.
 */
export default function MenuScreen() {
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
                  Menu Content Here
                </Typography>
              </MainMenuBox>
            </RootMenuBox>
          </Fade>
        </CardActionArea>
      </Link>
    </Card>
  );
}