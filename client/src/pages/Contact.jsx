import Typography from '@mui/material/Typography';
import React from 'react';
import ContactUsForm from '../components/shared/ContactUsForm';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Arabic from '../Arabic';
import English from '../English';
import CustomTheme from '../Theme';
import { ThemeProvider } from '@mui/material/styles';


const Contact = () => {
    const transition = {
        ar: Arabic,
        en: English
    };
    let lang = localStorage.getItem('lang') !== null ? localStorage.getItem('lang') : 'en';

    return (
        <ThemeProvider theme={CustomTheme}>
            <Box sx={{ mt: 10, ...(lang == 'ar' && { 'direction': 'rtl' }) }}>
                <Container>
                    <Box
                        sx={{
                            width: { xs: '100%', sm: '80%', md: '55%', lg: '50%' },
                            marginLeft: { xs: 'auto', lg: 0 },
                            marginRight: { xs: 'auto', lg: 0 },

                        }}
                    >
                        <Typography gutterBottom variant='h4' color='#000' sx={{ mb: 4 }}>{transition[lang].cu}</Typography>
                        <ContactUsForm />
                    </Box>
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export default Contact;
