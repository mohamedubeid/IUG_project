import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { React, useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import CustomTheme from '../../Theme';
import { ThemeProvider } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ProductCard from '../../components/categories/ProductCard';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import CategoryNav from '../../components/categories/CatagoryNav';
import Box from '@mui/material/Box';
import useStyles from '../../MakeStyles';
import axios from 'axios';
import Arabic from '../../Arabic';
import English from '../../English';
import HelperText from '../../components/shared/HelperText';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

const Catagory = () => {
    const transition = {
        ar: Arabic,
        en: English
    };
    const classes = useStyles();
    const navigate = useNavigate();
    const { catId } = useParams();
    const [products, setProducts] = useState([]);
    const [catName, setCatName] = useState('');
    const [productsCount, setProductsCount] = useState('');

    let lang = localStorage.getItem('lang') !== null ? localStorage.getItem('lang') : 'en';
    const [page, setPage] = useState(1);

    const handleChange_p = (event, value) => {
        setPage(value);
        if (window.location.search != '') {
            if (window.location.search.includes('page')) {
                let temp2 = window.location.search.split('&');
                if (temp2[0].includes('page')) {
                    temp2[0] = `?page=${value}`;
                    navigate(`${temp2.join('&')}`);
                } else if (temp2[1] && temp2[1].includes('page')) {
                    temp2[1] = `page=${value}`;
                    navigate(`${temp2.join('&')}`);
                }
            } else {
                navigate(`${window.location.search}&page=${value}`);
            }
        } else {
            navigate(value === 1 ? '' : `?page=${value}`);
        }
    };

    const [sortType, setSortType] = useState('New');

    const handleChange = (event) => {
        const value = event.target.value.toLowerCase();
        setSortType(event.target.value);
        if (window.location.search != '') {
            if (window.location.search.includes('sort')) {
                let temp2 = window.location.search.split('&');
                if (temp2[0].includes('sort')) {
                    temp2[0] = `?sort=${value}`;
                    navigate(`${temp2.join('&')}`);
                } else if (temp2[1] && temp2[1].includes('sort')) {
                    temp2[1] = `sort=${value}`;
                    navigate(`${temp2.join('&')}`);
                }
            } else {
                navigate(`${window.location.search}&sort=${value}`);
            }
        } else {
            navigate(value === 1 ? '' : `?sort=${value}`);
        }
    };

    const userToken = localStorage.getItem('accessToken');

    useEffect(() => {
        axios({
            method: 'get',
            url: `http://localhost:8877/api/${lang}/categories/${catId}/products?page=${page}&sort=${sortType}`,
            headers: { Authorization: `Bearer ${userToken}` }
        }).then((result) => {
            return setProducts(result.data);
        });
        axios.get(`http://localhost:8877/api/${lang}/categories/${catId}/name-count`)
            .then((result) => {
                setCatName(result.data[0].categoryName);
                setProductsCount(result.data[0].productsCount);
            });
            window.scrollTo(0, 0);
    }, [page, sortType]);
    useEffect(() => {
        window.history.replaceState(null, null, `/${lang}/catagories/${catId}/${catName}`);
    }, [lang, catName]);


    const productsCard = useMemo(() => products?.map((arr, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
            <ProductCard
                type={'cat'}
                data={arr}
                catName={catName}
            />
        </Grid>
    )), [products, catName]);

    return (
        <ThemeProvider theme={CustomTheme}>
            <Box>

                <CategoryNav lang={lang} catagoryName={catName} catId={catId} />
                <Container>
                    <Box sx={{ ...(lang == 'ar' && { 'direction': 'rtl' }) }}>
                        <Typography sx={{ display: 'inline', pr: 2, verticalAlign: 'sub', pl: 2 }}>{transition[lang].sot}</Typography>
                        <Box sx={{ width: 140, display: 'inline-block', mb: 3, }}>
                            <FormControl disabled={products?.length == 0} fullWidth>
                                <Select
                                    value={sortType}
                                    onChange={handleChange}
                                    className={classes.container}
                                    sx={{
                                        height: '40px',
                                        border: 'none',
                                    }}
                                >
                                    <MenuItem value='New'>{transition[lang].n}</MenuItem>
                                    <MenuItem value='Price'>{transition[lang].p}</MenuItem>
                                    <MenuItem value='Name'>{transition[lang].name}</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>

                    <Grid container columnSpacing={{ xs: '0', sm: '8', md: '0' }}
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                    >
                        {productsCard}
                        {products?.length == 0 &&
                            <HelperText text={'cht'} icon={SentimentDissatisfiedIcon} style={{ color: '#666', display: 'flex', justifyContent: 'center', width: '100%', mt: 8, mb: 8 }} textFontSize={'18px'} />
                        }
                    </Grid>


                    <Pagination
                        disabled={products?.length == 0}
                        sx={{ pt: 10, pb: 30, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        color='primary'
                        page={page}
                        onChange={handleChange_p}
                        count={Math.ceil(productsCount / 16)}  /**error here   parseInt(productsCount) / 2   */
                        renderItem={(item) => (
                            <PaginationItem
                                sx={{ fontWeight: '600', fontSize: '17px' }}
                                {...item}
                            />
                        )}
                    />
                </Container>


            </Box >
        </ThemeProvider >

    )
}

export default Catagory;