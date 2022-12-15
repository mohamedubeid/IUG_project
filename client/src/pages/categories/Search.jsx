import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { React, useEffect, useState, useMemo } from 'react';
import CustomTheme from '../../Theme';
import { ThemeProvider } from '@mui/material/styles';
import ProductCard from '../../components/categories/ProductCard';
import Grid from '@mui/material/Grid';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import HelperText from '../../components/shared/HelperText';



const Search = () => {
    const [products, setProducts] = useState([]);
    let lang = localStorage.getItem('lang') !== null ? localStorage.getItem('lang') : 'en';
    const { searchText } = useParams();


    useEffect(() => {
        axios.get(`http://localhost:8877/api/${lang}/search/${searchText}`)
            .then((result) => {
                setProducts(result.data)
            });
        window.scrollTo(0, 0);
    }, []);
    const searchProducts = useMemo(() => products?.map((arr) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={arr.id} sx={{ display: 'flex', justifyContent: 'center' }}>
            <ProductCard
                type={'cat'}
                data={arr}
                catName={products[0]?.categoryName}
            />
        </Grid>
    )), [products]);
    return (
        <ThemeProvider theme={CustomTheme}>
            <Container sx={{ mt: 15, mb: 20 }}>
                <Typography gutterBottom variant='h4' color='#000'>{searchText}</Typography>

                <Grid container columnSpacing={{ xs: '0', sm: '8', md: '0' }}
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                >
                    {searchProducts.length !== 0 ?
                        searchProducts
                        :
                        <HelperText
                            text={'searchHealperText'}
                            icon={SentimentDissatisfiedIcon}
                            color={'#666'}
                            style={{ mt: 3, display: 'flex', width: '100%', justifyContent: 'center', color: '#666' }}
                        />
                    }
                </Grid>

            </Container>
        </ThemeProvider >
    )
}

export default Search;