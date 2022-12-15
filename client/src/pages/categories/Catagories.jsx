import { React, useEffect, useState } from 'react';
import CatagoriesCard from '../../components/categories/CatagoriesCard';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Button from '@mui/material/Button';
import Arabic from '../../Arabic';
import English from '../../English';
import CustomTheme from '../../Theme';
import { ThemeProvider } from '@mui/material/styles';


const Catagories = () => {
    const transition = {
        ar: Arabic,
        en: English
    };
    let lang = localStorage.getItem('lang') !== null ? localStorage.getItem('lang') : 'en';

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8877/api/${lang}/categories`)
            .then((result) => {
                setCategories(result.data)
            });
            window.scrollTo(0, 0);
    }, []);

    const cat_cards = categories.map((card, i) => {
        return (
            <Grid item xs={2} rowSpacing={8} key={i}>
                <Button
                    href={`/${localStorage.getItem('lang')}/catagories/${card.id}/${card.categoryName}`}
                    style={{ textDecoration: 'none', color: 'black' }}
                    key={card.categoryName}>
                    <CatagoriesCard icon={card.categoryImg} name={card.categoryName} />
                </Button >
            </Grid>
        );
    });


    return (
        <ThemeProvider theme={CustomTheme}>
            <Container sx={{ mt: 15, mb: 20 }}>
                <Typography sx={{
                    ...(lang == 'ar' && { 'direction': 'rtl' })
                }} gutterBottom variant='h4' color='#000'>{transition[lang].cat}</Typography>
                <Grid container sx={{ mt: 10 }}>
                    {cat_cards}
                </Grid>
            </Container >
        </ThemeProvider>
    );
};

export default Catagories;