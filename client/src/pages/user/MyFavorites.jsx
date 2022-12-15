import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import React, { useState, useEffect, useMemo } from 'react';
import CustomTheme from '../../Theme';
import { ThemeProvider } from '@mui/material/styles';
import ProductCard from '../../components/categories/ProductCard';
import Grid from '@mui/material/Grid';
import Arabic from '../../Arabic';
import English from '../../English';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NotifyUser from '../../components/shared/NotifyUser';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import HelperText from '../../components/shared/HelperText';

const MyFavorites = () => {

    const navigate = useNavigate();
    const transition = {
        ar: Arabic,
        en: English
    };
    let lang = localStorage.getItem('lang') !== null ? localStorage.getItem('lang') : 'en';
    const userToken = localStorage.getItem('accessToken');

    const [open, setOpen] = useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const [text, setText] = useState('');

    const handleRemoveFav = (id) => {
        axios({
            method: 'delete',
            url: `http://localhost:8877/api/products/favorites/${id}`,
            headers: { Authorization: `Bearer ${userToken}` },
        }).then((result) => {
            setText(result.data.msg)
            return setOpen(true);
        }).catch((error) => {
            if(error.response){
                if (error.response.status == 403 || error.response.status == 401) {
                    localStorage.removeItem('accessToken');
                    return navigate(`/${lang}/login`, { replace: true });
                };
            };
            
        });
        setFavProduct(favProduct.filter(fav => { return fav.id != id }));
    };

    const [favProduct, setFavProduct] = useState([]);
    useEffect(() => {
        if (!userToken) {
            navigate('/', { replace: true });
        };

        axios({
            method: 'get',
            url: `http://localhost:8877/api/${lang}/products/favorites`,
            headers: { Authorization: `Bearer ${userToken}` }
        }).then((result) => {
            return setFavProduct(result.data.data);
        }).catch((error) => {
            if (error.response) {
                if (error.response.status == 403 || error.response.status == 401) {
                    localStorage.removeItem('accessToken');
                    return navigate(`/${lang}/login`, { replace: true });
                };
            };
        });
        window.scrollTo(0, 0);
    }, []);

    const favoriteProducts_card = useMemo(() => favProduct?.map((arr) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={arr.id} sx={{ display: 'flex', justifyContent: 'center' }}>
            <ProductCard
                type={'fav'}
                data={arr}
                handleRemoveFav={handleRemoveFav}
            />
        </Grid>
    )), [favProduct]);


    return (
        <ThemeProvider theme={CustomTheme}>
            <Container sx={{ mt: 15, mb: 20 }}>
                <Typography gutterBottom variant='h4' color='#000' sx={{ ...(lang == 'ar' && { 'direction': 'rtl' }), textTransform: 'uppercase' }}>{transition[lang].mf}</Typography>

                <Grid container columnSpacing={{ xs: '0', sm: '8', md: '0' }}
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                >
                    {favoriteProducts_card.length !== 0 ?
                        favoriteProducts_card
                        :
                        <HelperText
                            text={'yhaf'}
                            icon={FavoriteBorderIcon}
                            color={'#666'}
                            style={{ mt: 3, display: 'flex', width: '100%', justifyContent: 'center', color: '#666', backgroudColor: 'var(--secondary)' }}
                        />
                    }
                </Grid>

            </Container>
            <NotifyUser open={open} handleClose={handleClose} text={text} />
        </ThemeProvider >
    )
}

export default MyFavorites; 