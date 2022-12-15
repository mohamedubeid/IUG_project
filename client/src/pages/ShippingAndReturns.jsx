import Typography from '@mui/material/Typography';
import React from 'react';
import Container from '@mui/material/Container';
import CustomTheme from '../Theme';
import { ThemeProvider } from '@mui/material/styles';
const ShippingAndReturns = () => {
    return (
        <ThemeProvider theme={CustomTheme}>
            <Container sx={{ mt: 15, mb: 20 }}>
                <Typography gutterBottom variant='h4' color='#000' sx={{ mb: 4 }}>SHIPPING & RETURNS</Typography>

                <Typography variant='h6' sx={{
                    lineHeight: '35px',
                }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam,
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                    cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                    cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </Typography>
            </Container>
        </ThemeProvider>
    )
}

export default ShippingAndReturns;