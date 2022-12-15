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


const Offers = () => {
  const transition = {
    ar: Arabic,
    en: English
  };
  const [products, setProducts] = useState([]);
  let lang = localStorage.getItem('lang') !== null ? localStorage.getItem('lang') : 'en';
  const userToken = localStorage.getItem('accessToken');
  const offers = useMemo(() => products?.map((arr, index) => (
    <Grid item xs={12} sm={6} md={4} lg={3} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
      <ProductCard
        type={'arrival'}
        data={arr}
        catName={products[0]?.categoryName}
      />
    </Grid>
  )), [products]);

  useEffect(() => {
    axios({
      method: 'get',
      url: `http://localhost:8877/api/${lang}/products/offers`,
      headers: { Authorization: `Bearer ${userToken}` }
    }).then((result) => {
      return setProducts(result.data)
    });
    window.scrollTo(0, 0);
  }, []);

  return <ThemeProvider theme={CustomTheme} >
    <Container sx={{ mt: 15, mb: 20 }}>
      <Typography gutterBottom variant='h4' color='#000' sx={{ ...(lang == 'ar' && { 'direction': 'rtl' }) }}>{transition[lang].o}</Typography>

      <Grid container columnSpacing={{ xs: '0', sm: '8', md: '0', ...(lang == 'ar' && { 'direction': 'rtl' }) }}
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        {offers}
      </Grid>

    </Container>
  </ThemeProvider >
};

export default Offers;
