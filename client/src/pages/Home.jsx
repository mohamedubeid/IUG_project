import Typography from '@mui/material/Typography';
import { React, useEffect, useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import ImageSlider from '../components/ImageSlider';
import CustomTheme from '../Theme';
import { ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import CardCarousel from '../components/categories/CardCarousel';
import Grid from '@mui/material/Grid';
import ProductCard from '../components/categories/ProductCard';
import ContactUsForm from '../components/shared/ContactUsForm';
import CatagoriesCard from '../components/categories/CatagoriesCard';
import axios from 'axios';
import Arabic from '../Arabic';
import English from '../English';

const Home = () => {
    const transition = {
        ar: Arabic,
        en: English
    }
    let lang = localStorage.getItem('lang') !== null ? localStorage.getItem('lang') : 'en';
    const userToken = localStorage.getItem('accessToken');
    const [categories, setCategories] = useState([]);
    const [newArrival, setNewArrival] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:8877/api/${lang}/categories`)
            .then((result) => {
                return setCategories(result.data)
            });
            axios({
                method: 'get',
                url: `http://localhost:8877/api/${lang}/products/new?limit=10`,
                headers: { Authorization: `Bearer ${userToken}` }
            }).then((result) => {
                return setNewArrival(result.data)
            })
        window.scrollTo(0, 0);
    }, []);

    const cat_cards = useMemo(() => categories.map((card) => {
        return <Button href={`/${localStorage.getItem('lang')}/catagories/${card.id}/${card.categoryName}`} style={{ textDecoration: 'none', color: 'black' }} key={card.id}>
            <CatagoriesCard icon={card.categoryImg} name={card.categoryName} key={card.id} />
        </Button >
    }), [categories]);

    const arrival_cards = useMemo(() => newArrival.map((arr) => (
        <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'center' }} key={arr.id}>
            <ProductCard
                type={'arrival'}
                data={arr}
                catName={newArrival[0]?.categoryName}

            />
        </Grid>
    )), [newArrival]);

    return (
        <ThemeProvider theme={CustomTheme} >
            <Box >
                <Box sx={{
                    position: "relative",

                }}>
                    <ImageSlider />
                    <Box sx={{
                        position: "absolute",
                        top: '140px',
                        pl: "190.6px",
                    }}>
                        <Box sx={{ ...(lang == 'ar' && { 'direction': 'rtl' }) }}>
                            <Typography variant='h4' gutterBottom sx={{ fontSize: '45px' }}>{transition[lang].b} <br />{transition[lang].aby}</Typography>
                            <Typography variant="body1" sx={{ fontSize: '13px' }}>{transition[lang].aocb}<br />{transition[lang].oala}</Typography>
                        </Box>
                        <Button sx={{
                            backgroundColor: 'var(--secondary)', color: 'black', p: '16px', fontWeight: '600', fontSize: '16px', borderRadius: '10px', mt: '60px', '&:hover': {
                                backgroundColor: 'var(--primary)'
                            }
                        }}>{transition[lang].sn}  &nbsp; &nbsp;  &nbsp;
                            <ArrowRightAltIcon />
                        </Button>
                    </Box>
                </Box >


                <Box sx={{ mt: '30px' }}>
                    <Container sx={{ textAlign: 'center', mb: 15 }} >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <hr style={{ flex: 1, backgroundColor: 'var(--primary)', height: '3px', border: 'none' }} />
                            <Typography sx={{ fontSize: '40px', fontWeight: '700', p: '60px', color: '#000' }}>{transition[lang].cat}</Typography>
                            <hr style={{ flex: 1, backgroundColor: 'var(--primary)', height: '3px', border: 'none' }} />
                        </Box>
                        {/* Cards Carousal */}

                        <CardCarousel cards={cat_cards} isProducts={false} />

                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <hr style={{ flex: 1, backgroundColor: 'var(--primary)', height: '3px', border: 'none' }} />
                            <Typography sx={{ fontSize: '40px', fontWeight: '700', p: '60px', color: '#000' }}>{transition[lang].nea}</Typography>
                            <hr style={{ flex: 1, backgroundColor: 'var(--primary)', height: '3px', border: 'none' }} />
                        </Box>
                        <Grid container columnSpacing={{ xs: '0', sm: '20', md: '10', lg: '0' }}   >
                            {arrival_cards}
                        </Grid>

                    </Container>

                    <img src='/images/smiley-woman-posing-while-holding-shopping-bags-with-copy-space.png' alt='smiley-woman-posing' height='500px' width='100%' />

                    <Container sx={{ mt: '50px' }}>

                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <hr style={{ flex: 1, backgroundColor: 'var(--primary)', height: '3px', border: 'none' }} />
                            <Typography sx={{ fontSize: '40px', fontWeight: '700', p: '60px', color: '#000' }}>{transition[lang].cu}</Typography>
                            <hr style={{ flex: 1, backgroundColor: 'var(--primary)', height: '3px', border: 'none' }} />
                        </Box>


                        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, pb: '60px' }}>
                            <img src='/images/Mask Group 33.png' alt='Mask Group ' style={{ flexGrow: 1, paddingRight: '20px', width: '55%', marginLeft: 'auto', marginRight: 'auto' }} />
                            <ContactUsForm />
                        </Box>
                    </Container>

                </Box >
            </Box>
        </ThemeProvider >

    );
};


export default Home;