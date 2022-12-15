import React, { useState, useEffect, useMemo } from 'react';
import CustomTheme from '../../Theme';
import { ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import useStyles from '../../MakeStyles';
import ShoppingCard from '../../components/client/ShoppingCard';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Arabic from '../../Arabic';
import English from '../../English';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NotifyUser from '../../components/shared/NotifyUser';


const ShoppingCart = () => {
    const transition = {
        ar: Arabic,
        en: English
    };
    let lang = localStorage.getItem('lang') !== null ? localStorage.getItem('lang') : 'en';
    const userToken = localStorage.getItem('accessToken');
    const guestToken = sessionStorage.getItem('accessToken');
    const token = userToken || guestToken;
    const classes = useStyles();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const handleCheckout = () => { // if user -> move guest cartProduct to user cart  if guest -> to no-shipping-address 
        if (userToken) {
            navigate(`/${lang}/shipping-address`, { replace: false });
            return window.scrollTo(0, 0);
        }
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const [shoppingProducts, setShoppingProducts] = useState([]);
    useEffect(() => {
        window.scrollTo(0, 0);
        if (token) {
            axios({
                method: 'get',
                url: `http://localhost:8877/api/cart/${lang}/products`,
                headers: { Authorization: `Bearer ${token}` }
            }).then((result) => {
                return setShoppingProducts(result.data.data)
            }).catch((error) => {
                if (error.response) {
                    if (error.response.status == 403 || error.response.status == 401) {
                        localStorage.removeItem('accessToken');
                        sessionStorage.removeItem('accessToken');
                        return navigate(`/${lang}/login`, { replace: true });
                    }
                }
            });
        };
    }, []);

    const [openM, setOpenM] = useState(false);
    const handleCloseM = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenM(false);
    };
    const [text, setText] = useState('');

    const handleClearButton = (cartProductId) => {
        axios({
            method: 'delete',
            url: `http://localhost:8877/api/cart/products/${cartProductId}`,
            headers: { Authorization: `Bearer ${token}` },
        }).then((result) => {
            setText(result.data.msg)
            return setOpenM(true);
        }).catch((error) => {
            if (error.response) {
                if (error.response.status == 403 || error.response.status == 401) {
                    localStorage.removeItem('accessToken');
                    return navigate(`/${lang}/login`, { replace: true });
                };
            };
        });
        setShoppingProducts(shoppingProducts.filter(add => { return add.cartProductId != cartProductId }));
    };

    const ShoppingCards = useMemo(() => shoppingProducts.map((product) =>
        <ShoppingCard key={product.cartProductId} data={product} handleClearButton={handleClearButton} />
    ), [shoppingProducts]);
    return (
        <ThemeProvider theme={CustomTheme}>
            <Container sx={{ mt: 10, mb: 20, textAlign: 'center' }}>
                <Typography variant='h5' sx={{ mb: 4, fontWeight: '600', fontSize: '28px', color: '#000', ...(lang == 'ar' ? { 'textAlign': 'right' } : { 'textAlign': 'left' }) }}>
                    {transition[lang].sc}</Typography>
                {ShoppingCards}
                <Button
                    className={classes.btn}
                    onClick={handleCheckout}
                    disabled={shoppingProducts?.length === 0}
                    sx={{ mt: 8, padding: '15px 70px' }}
                >{transition[lang].co}</Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    sx={{
                        backgroundColor: 'rgb(0 0 0 / 0%)',
                        '.MuiPaper-root': {
                            borderRadius: '15px'
                        }
                    }}>
                    <DialogContent sx={{ p: 8 }}>
                        <Typography gutterBottom sx={{
                            fontWeight: '700',
                            fontSize: '22px',
                            pb: 5,
                        }}>{transition[lang].dywt}</Typography>
                        <DialogActions sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'space-evenly' }}>
                            <Button
                                className={classes.btn}
                                sx={{ width: '100%', mr: 3, p: 3, padding: '10px 10px' }}
                                href={`/${lang}/shipping-address`}
                            >{transition[lang].g}</Button>
                            <Button
                                sx={{ width: '100%', ml: 3, padding: '10px 10px' }}
                                className={classes.btn}
                                href={`/${lang}/login`}
                            >{transition[lang].us}</Button>
                        </DialogActions>
                    </DialogContent>
                </Dialog>
            </Container>
            <NotifyUser severity={"success"} open={openM} handleClose={handleCloseM} text={text} />
        </ThemeProvider >
    );
};
export default ShoppingCart;