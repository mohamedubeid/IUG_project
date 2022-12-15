import React, { useState, useEffect } from 'react';
import CustomTheme from '../../Theme';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import useStyles from '../../MakeStyles';
import Grid from '@mui/material/Grid';
import WrongLocationIcon from '@mui/icons-material/WrongLocation';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import ReviewOrders from '../../components/client/ReviewOrders';
import Arabic from '../../Arabic';
import English from '../../English';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const NoShippingAddress = () => {
    const transition = {
        ar: Arabic,
        en: English
    };
    let lang = localStorage.getItem('lang') !== null ? localStorage.getItem('lang') : 'en';
    const classes = useStyles();
    const navigate = useNavigate();
    const guestToken = sessionStorage.getItem('accessToken');
    const [shoppingProducts, setShoppingProducts] = useState([]);
    const getShippingProducts = () => {
        axios({
            method: 'get',
            url: `http://localhost:8877/api/cart/${lang}/products`,
            headers: { Authorization: `Bearer ${guestToken}` }
        }).then((result) => {
            return setShoppingProducts(result.data.data)
        }).catch((error) => {
            if (error.response) {
                if (error.response.status == 403 || error.response.status == 401) {
                    sessionStorage.removeItem('accessToken');
                    localStorage.removeItem('accessToken');
                    return navigate(`/${lang}/login`, { replace: true });
                };
            };
        });
    };
    useEffect(() => {
        if (!guestToken) {
            return navigate('/', { replace: true });
        }
        window.scrollTo(0, 0);
        getShippingProducts();
    }, []);
    return (
        <ThemeProvider theme={CustomTheme}>
            <Container sx={{ mt: 15, mb: 20 }}>
                <Typography gutterBottom sx={{ mb: 5, ...(lang == 'ar' && { 'direction': 'rtl' }) }} variant='h4'>{transition[lang].sipa}</Typography>
                <Grid justifyContent='space-between' container columns={24}>
                    <Grid item sx={{ p: 10, textAlign: 'center', height: '50%', marginBottom: { xs: '30px', md: '0px' }, marginLeft: 'auto', marginRight: 'auto' }} className={classes.container} xs={24} sm={18} md={13} >
                        <WrongLocationIcon sx={{ height: '110px', width: '110px', mb: 3, color: '#000' }} />
                        <Typography gutterBottom sx={{ fontSize: '16px' }}>{transition[lang].ych}</Typography>
                        <Button
                            href={`/${lang}/add-new-address`}
                            sx={{ p: '10px 10%', mt: 10 }}
                            className={classes.btn}
                            startIcon={<AddOutlinedIcon sx={{ height: '30px', width: '30px' }}
                            />}>
                            {transition[lang].adna}
                        </Button>
                    </Grid>

                    <Grid
                        item
                        xs={24}
                        sm={18}
                        md={10}
                        sx={{ marginLeft: 'auto', marginRight: 'auto' }}>
                        <Box className={classes.container}><ReviewOrders orders={shoppingProducts} getShippingProducts={getShippingProducts} /></Box>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    )
}

export default NoShippingAddress