import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { React, useEffect, useState, useMemo } from 'react';
import CustomTheme from '../../Theme';
import { ThemeProvider } from '@mui/material/styles';
import ProductCard from '../../components/categories/ProductCard';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import Arabic from '../../Arabic';
import English from '../../English';


const New = () => {
    const transition = {
        ar: Arabic,
        en: English
    };
    const [newArrival, setNewArrival] = useState([]);
    let lang = localStorage.getItem('lang') !== null ? localStorage.getItem('lang') : 'en';
    const userToken = localStorage.getItem('accessToken');
    const newProducts = useMemo(() => newArrival.map((arr, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
            <ProductCard
                type={'cat'}
                data={arr}
                catName={newArrival[0]?.categoryName}
            />
        </Grid>
    )), [newArrival]);


    useEffect(() => {
        axios({
            method: 'get',
            url: `http://localhost:8877/api/${lang}/products/new?limit=20`,
            headers: { Authorization: `Bearer ${userToken}` }
        }).then((result) => {
            return setNewArrival(result.data);
        });
        window.scrollTo(0, 0);
    }, []);

    return <ThemeProvider theme={CustomTheme}>
        <Container sx={{ mt: 15, mb: 20 }}>
            <Typography gutterBottom variant='h4' color='#000' sx={{ ...(lang == 'ar' && { 'direction': 'rtl' }) }}>{transition[lang].n}</Typography>

            <Grid container columnSpacing={{ xs: '0', sm: '8', md: '0' }}
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
            >
                {newProducts}
            </Grid>

        </Container>
    </ThemeProvider >
};

export default New;
