import React from 'react';
import { Card, CardActionArea, Typography } from '@mui/material';
import { RootBox, MainBox, SecondBox } from '@/components/styles/StyledHomeScreen';
import Link from 'next/link';
import Fade from '@mui/material/Fade';

/**
 * Functional component for the home screen.
 * @returns {JSX.Element} JSX representation of the home screen.
 */
export default function HomeScreen() {
    return (
        <Card>
            <Link href="/menu" passHref>
                <CardActionArea>
                    <Fade in={true} timeout={200}>
                        <RootBox>
                            <MainBox>
                            <Typography variant="h1">
                                Order <br /> & pay <br /> here
                            </Typography>
                            </MainBox>
                            <SecondBox>
                            <Typography variant="h3">
                                Touch to start
                            </Typography>
                            </SecondBox>
                        </RootBox>
                    </Fade>
                </CardActionArea>
            </Link>
        </Card>
    );
}