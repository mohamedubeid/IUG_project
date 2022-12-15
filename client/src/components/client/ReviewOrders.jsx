import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ProductCount from '../categories/ProductCount';
import Arabic from '../../Arabic';
import English from '../../English';

const summaryPrice = {
    display: 'flex',
    justifyContent: 'space-between',
    pt: 1,
    pb: 1,
};
let lang = localStorage.getItem('lang') !== null ? localStorage.getItem('lang') : 'en';
const transition = {
    ar: Arabic,
    en: English
};



const ReviewOrders = (props) => {
    var subPrice = 0;
    props.orders.map((sh) =>
        subPrice += parseFloat(sh.price) * sh.count
    );
    var totalPrice = parseFloat(subPrice) - (parseFloat(subPrice) * props.discount / 100) + parseFloat(props.shippingPrice);
    const cartProducts = props.orders.map((order) => <Item order={order} key={order?.cartProductId} getShippingProducts={props.getShippingProducts} />);
    return (
        <Box sx={{ p: 5 }}>
            <Typography gutterBottom sx={{ ...(lang == 'ar' && { 'direction': 'rtl' }) }}>
                {transition[lang].rvo}
            </Typography>
            <Box sx={{
                height: '380px',
                overflow: 'scroll',
                mt: 1,
                overflowX: 'hidden',
                '&::-webkit-scrollbar-thumb': {
                    width: '1px',
                    borderRadius: '13px',
                    backgroundClip: 'padding-box',
                    border: '10px solid transparent',
                    boxShadow: 'inset 0 0 0 10px',
                    background: 'var(--secondary)',
                },
                '&::-webkit-scrollbar': {
                    marginLeft: '200px',
                    width: '6px',
                    borderRadius: '13px',
                    backgroundClip: 'padding-box',
                    border: '10px solid transparent',
                }
            }} >
                {cartProducts}
            </Box>
            <Box>
                <hr style={{ color: '#bbb', backgroundColor: '#bbb', margin: '24px 0px 25px 0px' }} />
                <Box sx={summaryPrice}>
                    <Typography sx={{ fontSize: '15px' }}>{transition[lang].spr}</Typography>
                    <Typography sx={{ fontSize: '15px' }}>{subPrice}.00 {transition[lang].kwd}</Typography>
                </Box>
                {props.shippingPrice ? <Box>
                    <Box sx={summaryPrice}>
                        <Typography sx={{ fontSize: '15px' }}>{transition[lang].si}</Typography>
                        <Typography sx={{ fontSize: '15px' }}>{props.shippingPrice} {transition[lang].kwd}</Typography>
                    </Box>
                    <Box sx={summaryPrice}>
                        <Typography sx={{ fontSize: '15px' }}>{transition[lang].di}</Typography>
                        <Typography sx={{ fontSize: '15px' }}>{props.discount ? parseFloat(subPrice) * props.discount / 100 : 0} {transition[lang].kwd}</Typography>
                    </Box>
                    <hr style={{ color: '#bbb', margin: '25px 0px 25px 0px', borderTop: '1px dashed  ' }} />
                    <Box sx={summaryPrice}>
                        <Typography sx={{ fontSize: '15px' }}>{transition[lang].tp}</Typography>
                        <Typography sx={{ fontSize: '15px' }}>{totalPrice ? totalPrice : 0} {transition[lang].kwd}</Typography>
                    </Box>
                </Box> : null}
            </Box>
        </Box >
    );
};


const Item = (props) => {
    const transition = {
        ar: Arabic,
        en: English
    };
    const { img, price, name, count, maxCount, cartProductId } = props.order;
    let lang = localStorage.getItem('lang') !== null ? localStorage.getItem('lang') : 'en';
    return (
        <Grid container sx={{ mt: 5 }} justifyContent='space-between' >
            <Grid item xs={6}>
                <img src={`/images/${img}.png`} style={{
                    width: '75px',
                    height: '75px',
                    WebkitBoxShadow: '0px 3px 6px 0px #0000002e',
                    WebkitBorderRadius: '15px'
                }} />
            </Grid>
            <Grid item xs={7} sx={{ marginTop: 'auto', marginBottom: 'auto' }}>
                <Typography gutterBottom color='primary'>{name}</Typography>
                <Box sx={{ width: '120px', height: '30px' }}><ProductCount count={count} maxCount={maxCount} cartProductId={cartProductId} getShippingProducts={props.getShippingProducts} /></Box>
            </Grid>
            <Grid item xs={7} sx={{ marginTop: 'auto', marginBottom: 'auto' }}>
                <Typography >{price} {transition[lang].kwd} </Typography>
            </Grid>
        </Grid>
    );
};

export default ReviewOrders;
