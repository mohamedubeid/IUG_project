import React, { useState } from 'react';
import CustomTheme from '../../Theme';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ProductCount from '../categories/ProductCount'
import useStyles from '../../MakeStyles';
import ClearIcon from '@mui/icons-material/Clear';
import Arabic from '../../Arabic';
import English from '../../English';


const ShoppingCard = (props) => {
    const transition = {
        ar: Arabic,
        en: English
    };
    let lang = localStorage.getItem('lang') !== null ? localStorage.getItem('lang') : 'en';
    const classes = useStyles();
    const { cartProductId, img, name, price, count, maxCount, isOffer, originalPrice } = props.data;

    console.log(isOffer);
    return (
        <ThemeProvider theme={CustomTheme}>
            <Box
                className={classes.container}
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    p: 4,
                    position: 'relative',
                    m: 5
                }}>
                <Box className={classes.container}
                    sx={{
                        height: '150px',
                        width: '150px'
                    }}>
                    <img src={`/images/${img}.png`}
                        style={{
                            height: '150px',
                            width: '150px'
                        }} />
                </Box>
                <Box sx={{ width: '160px', height: '130px', display: 'flex', justifyContent: 'space-around', flexDirection: 'column' }}>
                    <Typography color='primary' sx={{ fontSize: '22px', fontWeight: '700', textAlign: 'center' }}>{name}</Typography>
                    <Box sx={{ width: '150px' }}><ProductCount cartProductId={cartProductId} count={count} maxCount={maxCount} /></Box>
                </Box>
                <Box sx={{ flex: 0.5, marginTop: 'auto', marginBottom: 'auto', }}>
                    {isOffer > 0 && <Typography variant="body1" fontWeight='bold' fontSize='16px' sx={{ textDecoration: 'line-through', color: '#707070', whiteSpace: 'nowrap', textAlign: 'left' }}>
                        {(originalPrice * count).toFixed(2)}{transition[lang].kwd}
                    </Typography>}
                    <Typography sx={{ fontSize: '20px', textAlign: 'left' }}>{(price * count).toFixed(2)}{transition[lang].kwd}</Typography>
                </Box>
                <IconButton sx={{ position: 'absolute', top: '10px', right: '10px', color: '#000' }} onClick={() => props.handleClearButton(cartProductId)}>
                    <ClearIcon />
                </IconButton>
            </Box>
        </ThemeProvider>
    )
};

export default ShoppingCard;