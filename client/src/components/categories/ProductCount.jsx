import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import MinimizeIcon from '@mui/icons-material/Minimize';
import axios from 'axios';

const ProductCount = (props) => {
    const [productCount, setProductCount] = useState(props.count);
    const handleProductCount = (n) => {
        const temp = productCount + n;
        if (temp <= props.maxCount && temp > 0) {
            setProductCount(temp);
            axios({
                method: 'put',
                url: `http://localhost:8877/api/cart/products/${props.cartProductId}`,
                data: { count: temp },
            }).then(() => props.getShippingProducts && props.getShippingProducts())
        };
    };
    const handleCount = (e) => {
        if (!isNaN(parseInt(e.target.value)) && parseInt(e.target.value) !== 0) {
            if (parseInt(e.target.value) <= props.maxCount) {
                setProductCount(parseInt(e.target.value));
                axios({
                    method: 'put',
                    url: `http://localhost:8877/api/cart/products/${props.cartProductId}`,
                    data: { count: parseInt(e.target.value) },
                }).then(() => props.getShippingProducts && props.getShippingProducts())
            };
        };
    };
    return (
        <Box sx={{ display: 'flex', borderRadius: '15px', boxShadow: '0px 5px 10px 0px #0000002e', backgroundColor: 'var(--secondary)', height: '100%' }}>
            <IconButton size='small'
                disableRipple
                onClick={() => { handleProductCount(-1); }}
                sx={{ p: '10px', color: '#000' }}
                disabled={productCount == 1}>
                <MinimizeIcon sx={{ pb: '8px' }} />
            </IconButton>
            <TextField
                variant='standard'
                InputProps={{
                    disableUnderline: true,
                }}
                sx={{ pl: '5px', mt: 'auto', mb: 'auto' }}
                value={productCount}
                onChange={handleCount} />
            <IconButton size='small'
                disableRipple
                disabled={productCount >= props.maxCount}
                onClick={() => { handleProductCount(1); }}
                sx={{ p: '10px', color: '#000' }}>
                <AddIcon />
            </IconButton>
        </Box>
    )
};

export default ProductCount;