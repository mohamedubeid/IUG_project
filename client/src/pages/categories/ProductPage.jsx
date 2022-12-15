import { React, useEffect, useState, useMemo } from 'react';
import CustomTheme from '../../Theme';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CatagoryNav from '../../components/categories/CatagoryNav';
import { useParams } from 'react-router-dom';
import ProductImageGallery from '../../components/categories/ProductImageGallery';
import useStyles from '../../MakeStyles';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import ProductCard from '../../components/categories/ProductCard';
import CardCarousel from '../../components/categories/CardCarousel';
import ProductCount from '../../components/categories/ProductCount';
import axios from 'axios';
import Arabic from '../../Arabic';
import English from '../../English';
import { useNavigate } from 'react-router-dom';

const ProductPage = () => {
    const navigate = useNavigate();
    const classes = useStyles();
    const { productId, catId } = useParams();
    const [product, setProduct] = useState({});
    const productName = product?.productName;
    const catName = product?.categoryName;
    const favId = product?.favId;
    const [isFav, setFav] = useState(false);
    const transition = {
        ar: Arabic,
        en: English
    }
    const [imags, setImages] = useState([]);
    const [similarProducts, setSimilarProducts] = useState([]);
    let lang = localStorage.getItem('lang') !== null ? localStorage.getItem('lang') : 'en';
    const userToken = localStorage.getItem('accessToken');
    const [soldOut, setSoldOut] = useState(false);
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    let current = new Date();
    let offerToDate = new Date(product?.offerTo);
    let offerFromDate = new Date(product?.offerFrom);
    let isOffer = current > offerFromDate && current < offerToDate && product.offerPrice != null && product.offerPrice < product.price;

    let ImagesGallery = useMemo(() => imags.map(img => {
        return {
            original: `/images/${img?.img}.png`,
            thumbnail: `/images/${img?.img}.png`,
            thumbnailClass: 'thumb',
            originalClass: 'original',
            originalAlt: 'product-image',
            thumbnailAlt: 'product-image',
        }
    }), [imags]);

    const handleFav = () => {
        if (favId >= 0) {
            if (favId == 0 || !isFav) {
                axios({
                    method: 'post',
                    url: `http://localhost:8877/api/products/favorites/${productId}`,
                    headers: { Authorization: `Bearer ${userToken}` },
                }).then(result => {
                    setFav(true);
                }).catch((error) => {
                    if (error.response) {
                        if (error.response.status == 409) {
                            setFav(true);
                        } else if (error.response.status == 403 || error.response.status == 401) {
                            localStorage.removeItem('accessToken');
                            return navigate(`/${lang}/login`, { replace: false });
                        }
                    }
                });
            } else {
                axios({
                    method: 'delete',
                    url: `http://localhost:8877/api/products/favorites/${productId}`,
                    headers: { Authorization: `Bearer ${userToken}` },
                }).then(result => {
                    setFav(false);
                }).catch((error) => {
                    if (error.response) {
                        if (error.response.status == 403 || error.response.status == 401) {
                            localStorage.removeItem('accessToken');
                            return navigate(`/${lang}/login`, { replace: false });
                        }
                    }
                });
            }
        } else {
            navigate(`/${lang}/login`);
            window.scrollTo(0, 0);
        }
    };

    useEffect(() => {
        axios({
            method: 'get',
            url: `http://localhost:8877/api/${lang}/categories/${catId}/products/${productId}`,
            headers: { Authorization: `Bearer ${userToken}` }
        }).then((result) => {
            console.log(result.data, '*************')
            setProduct(result.data.product);
            setImages(result.data.imgs);
            setFav(result.data.product?.favId ? result.data.product.favId != 0 : false);
            return result.data.product.count <= 0 ? setSoldOut(true) : setSoldOut(false);
        });

        axios({
            method: 'get',
            url: `http://localhost:8877/api/${lang}/categories/${catId}/products?limit=10`,
            headers: { Authorization: `Bearer ${userToken}` }
        }).then((result) => {
            return setSimilarProducts(result.data);
        });
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        window.history.replaceState(null, null, `/${lang}/catagories/${catId}/${catName}/${productId}/${productName}`);
    }, [lang, catName]);

    const similarProductsCards = useMemo(() => similarProducts.map((arr, i) => (
        <ProductCard
            catName={catName}
            data={arr}
            key={i}
        />
    )), [similarProducts]);


    return (
        <ThemeProvider theme={CustomTheme}>
            <CatagoryNav catagoryName={catName} productName={productName} catId={catId} lang={lang} />
            <Container>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: { xs: 'center', md: 'flex-start' }, flexDirection: { xs: 'column', md: 'row' } }}>
                    <Box sx={{ width: { xs: '55%', md: '430px' }, minWidth: '360px' }}>
                        <ProductImageGallery images={ImagesGallery} />
                    </Box>

                    <Box sx={{ maxWidth: '580px', width: '90%', ml: 2, mt: { xs: 6, md: 0 } }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', pb: 6 }}>
                            <Typography sx={{ fontWeight: '600', fontSize: '34px' }} variant='h4' color='primary'>{productName}</Typography>
                            {isOffer ?
                                <Box>
                                    <Typography variant="body1" fontWeight='bold' fontSize='19px' sx={{ textDecoration: 'line-through', color: '#707070', whiteSpace: 'nowrap' }}>
                                        {`${product?.price} ${transition[lang].kwd}`}
                                    </Typography>
                                    <Typography sx={{ fontWeight: '600', fontSize: '27px' }} variant='h4' >{product?.offerPrice} {transition[lang].kwd}</Typography>
                                </Box>
                                :
                                <Typography sx={{ fontWeight: '600', fontSize: '27px' }} variant='h4' >{product?.price} {transition[lang].kwd}</Typography>
                            }
                        </Box>
                        <Box className={classes.container} sx={{ padding: '50px 60px', ...(lang == 'ar' && { 'direction': 'rtl' }) }}>
                            <Typography gutterBottom variant='h5'>{transition[lang].dsc}</Typography>
                            <Typography gutterBottom variant='body2' sx={{ color: '#6b6666', lineHeight: '25px' }}>
                                {product?.desc}
                            </Typography>
                            <Typography gutterBottom sx={{ textAlign: 'center', mt: 7 }}>SKU</Typography>
                            <Typography gutterBottom sx={{ textAlign: 'center' }}>{productName}</Typography>
                            {soldOut ?
                                <Button color='error' variant='contained'
                                    sx={{
                                        borderRadius: '15px',
                                        padding: '15px 30px',
                                        display: 'block',
                                        marginLeft: 'auto',
                                        marginRight: 'auto',
                                        mt: 3,
                                        fontSize: '18px',
                                        cursor: 'default',
                                        '&:hover': {
                                            backgroundColor: '#DB0E0E'
                                        }
                                    }}>{transition[lang].so}</Button>
                                :
                                null
                            }
                        </Box>
                        {soldOut ? null :
                            <Box sx={{ display: 'flex', justifyContent: { xs: 'space-around', md: 'space-between' }, flexWrap: 'wrap', alignItems: 'flex-start', mt: 6 }}>

                                <Box sx={{ display: 'flex', width: '200px', justifyContent: 'space-between' }}>
                                    <Typography variant='body2' sx={{ pt: 2, fontSize: '20px', fontWeight: 600 }}>{transition[lang].c}</Typography>
                                    <Box sx={{ width: '125px', height: '55px' }}>{product?.count && <ProductCount maxCount={product?.maxCount} count={product?.count} cartProductId={product?.cartProductId} />}</Box>
                                </Box>
                                <Button sx={{
                                    backgroundColor: 'var(--secondary)',
                                    color: '#000',
                                    padding: '12px 20px',
                                    borderRadius: '17px',
                                    boxShadow: '0px 5px 10px 0px #0000002e',
                                    fontSize: '18px',
                                    fontWeight: '400',
                                    textTransform: 'capitalize',
                                    mb: { xs: 3, md: 'auto' },
                                    '&:hover': {
                                        backgroundColor: 'var(--primary)',
                                    }
                                }}
                                    onClick={() => console.log('add to cart')}
                                >{transition[lang].atc} </Button>

                                <Checkbox
                                    className={classes.btn}
                                    {...label}
                                    icon={<FavoriteBorder fontSize='large' />}
                                    checkedIcon={<Favorite fontSize='large' />}
                                    onClick={handleFav}
                                    checked={isFav}
                                    color='error'
                                    sx={{
                                        backgroundColor: 'var(--secondary)',
                                        width: '60px',
                                        borderRadius: '15px',
                                        color: '#000'
                                    }}
                                />

                                <Button className={classes.btn}
                                    sx={{ padding: '10px 10px' }}
                                    onClick={() => console.log('share')}
                                > <ShareOutlinedIcon fontSize='large' /> </Button>
                            </Box>
                        }
                    </Box>
                </Box>


                <Box sx={{ mb: 10 }}>
                    <Typography sx={{ mt: 12, mb: { xs: 10, md: 3 }, ...(lang == 'ar' && { 'direction': 'rtl' }) }} variant='h5'>{transition[lang].sp}</Typography>
                    <CardCarousel cards={similarProductsCards} products={true} />
                </Box>


            </Container>
        </ThemeProvider >
    )
}

export default ProductPage;