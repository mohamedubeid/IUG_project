import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import useStyles from '../../MakeStyles';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import Arabic from '../../Arabic';
import English from '../../English';
import Link from '@mui/material/Link';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NotifyUser from '../../components/shared/NotifyUser';

const ProductCard = (props) => {
    const transition = {
        ar: Arabic,
        en: English
    };
    const navigate = useNavigate();
    const { id, img, name, price, offerPrice, offerTo, offerFrom, categoryId, favId } = props.data;
    const [severity, setSeverity] = useState("success")
    const classes = useStyles();
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    let lang = localStorage.getItem('lang') !== null ? localStorage.getItem('lang') : 'en';
    let current = new Date();
    let offerToDate = new Date(offerTo);
    let offerFromDate = new Date(offerFrom);
    let isOffer = current > offerFromDate && current < offerToDate && offerPrice != null && offerPrice < price;
    const userToken = localStorage.getItem('accessToken');
    const guestToken = sessionStorage.getItem('accessToken');
    const token = userToken || guestToken;
    const [isFav, setFav] = useState(favId ? favId != 0 : false);
    const handleFav = () => {
        if (favId >= 0) {
            if (!isFav) {
                axios({
                    method: 'post',
                    url: `http://localhost:8877/api/products/favorites/${id}`,
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
                    url: `http://localhost:8877/api/products/favorites/${id}`,
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
            navigate(`/${lang}/login`)
        }
    };


    const [open, setOpen] = useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const [text, setText] = useState('');
    const handleAddToCart = () => {
        const tempToken = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
        axios({
            method: 'post',
            url: `http://localhost:8877/api/cart/products`,
            headers: tempToken && { Authorization: `Bearer ${tempToken}` },
            data: { productId: id }
        }).then(result => {
            if (result.status === 201) {
                sessionStorage.setItem("accessToken", result.data.accessToken);
            }
            setText(result.data.msg);
            setOpen(true);
            return setSeverity("success")
        }).catch((error) => {
            if (error.response) {
                if (error.response.status == 409) {
                    setText(error.response.data.msg);
                    setOpen(true);
                    return setSeverity("info");
                } else if (error.response.status == 403 || error.response.status == 401) {
                    localStorage.removeItem('accessToken');
                    sessionStorage.removeItem('accessToken');
                    return navigate(`/${lang}/login`, { replace: false });
                }
            }
        });

    }




    return <Card
        className={classes.container}
        sx={{
            maxWidth: '280px',
            textAlign: 'center',
            mt: '20px',
            mb: '20px',
            p: '12px 12px',
            position: 'relative',
            height: `${props.type == undefined ? '400px' : '450px'}`,
        }}

    >

        <Link sx={{ cursor: 'pointer', color: '#000' }}
            underline="none"
            href={`/${lang}/catagories/${categoryId}/${props.catName}/${id}/${name}`}
        >
            <CardMedia
                sx={{
                    borderRadius: "15px",
                    width: '100%',
                    mb: '15px',
                }}
                component="img"
                height="300x"
                image={`/images/${img}.png`}
                alt="image-name"
            />
            <Box >
                <Typography variant="body1" fontSize='17px' >
                    {name}
                </Typography>
                {isOffer ?
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'nowrap', padding: '8px' }}>
                        <Typography variant="body1" fontWeight='bold' fontSize='16px' sx={{ textDecoration: 'line-through', color: '#707070', whiteSpace: 'nowrap' }}>
                            {`${price} ${transition[lang].kwd}`}
                        </Typography>
                        <Typography variant="body1" fontWeight='bold' fontSize='16px' whiteSpace='nowrap'>
                            &nbsp;&nbsp; {`${offerPrice} ${transition[lang].kwd}`}
                        </Typography>
                    </Box>

                    :
                    <Typography variant="body1" fontWeight='bold' fontSize='19px' sx={{ padding: '8px' }} >
                        {`${price} ${transition[lang].kwd}`}
                    </Typography>
                }
            </Box>
        </Link>


        {
            props.type == 'cat' ?
                <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                    <Button className={classes.card_btn} href={`/${lang}/catagories/${categoryId}/${props.catName}/${id}/${name}`}>{transition[lang].det} </Button>
                    <Button onClick={handleAddToCart} className={classes.card_btn}>{transition[lang].atc}</Button>
                </Box>
                :
                props.type == 'arrival' ?
                    <Button onClick={handleAddToCart} className={classes.card_btn}>{transition[lang].atc}</Button>
                    :
                    props.type == 'fav' ?
                        <Box>
                            <Button onClick={handleAddToCart} className={classes.card_btn} >{transition[lang].atc} </Button>
                            <IconButton onClick={() => props.handleRemoveFav(id)} sx={{ position: 'absolute', top: '30px', right: '30px', color: '#95989a', backgroundColor: '#fff', width: '10px', height: '10px' }}>
                                <CancelIcon fontSize='large' />
                            </IconButton>
                        </Box>
                        :
                        null
        }

        {props.type != 'fav' && userToken && <Checkbox {...label} icon={<FavoriteBorder fontSize='small' />} checkedIcon={<Favorite />} checked={isFav} onClick={handleFav} color='error'
            sx={{ backgroundColor: '#bbb', position: 'absolute', top: '25px', right: '25px', height: '30px', width: '30px' }}
        />}
        {isOffer == true
            ?
            <Box sx={{ position: 'absolute', top: '20px', left: '13px' }}>
                <img src='/images/discount.png' style={{ position: 'absolute', height: '60px', width: '60px' }} alt="discount" />
                <Typography sx={{ position: 'absolute', fontSize: '20px', top: '15px', left: '8px', color: '#ffa8a8', fontWeight: 700 }}>{Math.ceil((1 - offerPrice / price) * 100)}%</Typography>
            </Box>
            :
            null}
        <NotifyUser severity={severity} open={open} handleClose={handleClose} text={text} />
    </Card >;
};

export default ProductCard;
