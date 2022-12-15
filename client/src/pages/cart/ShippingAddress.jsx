import React, { useState, useEffect } from 'react';
import CustomTheme from '../../Theme';
import { ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import useStyles from '../../MakeStyles';
import Grid from '@mui/material/Grid';
import ReviewOrders from '../../components/client/ReviewOrders';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ClearIcon from '@mui/icons-material/Clear';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import AddressCard from '../../components/client/AddressCard';
import Arabic from '../../Arabic';
import English from '../../English';
import HelperText from '../../components/shared/HelperText';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';



const ShippingAddress = () => {
    const transition = {
        ar: Arabic,
        en: English
    };
    let lang = localStorage.getItem('lang') !== null ? localStorage.getItem('lang') : 'en';
    const userToken = localStorage.getItem('accessToken');
    const guestToken = sessionStorage.getItem('accessToken');
    const token = userToken || guestToken;
    const navigate = useNavigate();
    const classes = useStyles();
    const [invalidPromoCode, setInvalidPromoCode] = useState(false);
    const [validPromoCode, setValidPromoCode] = useState(false);
    const [validDate, setValidDate] = useState(true);
    const InvalidText = (
        <HelperText
            style={{
                mt: 3,
                display: 'flex',
                alignItems: 'flex-start',
                color: 'var(--error)'
            }}
            textFontSize={'12px'}
            text={'ic'}
            iconFontSize={'18px'}
            icon={ClearIcon} />
    );

    const valideText = (
        <HelperText
            style={{
                mt: 3,
                display: 'flex',
                alignItems: 'flex-start',
                color: 'var(--success)'
            }}
            textFontSize={'12px'}
            text={'vc'}
            iconFontSize={'18px'}
            icon={CheckCircleOutlineIcon} />
    );
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const [deliveryTime, setDeliveryTime] = useState({
        date: '',
        time: '',
    });
    const handleDeliveryTime = (event) => {
        const { name, value } = event.target;
        setDeliveryTime({
            ...deliveryTime,
            [name]: value,
        });
    };
    const [openDone, setOpenDone] = useState(false);
    const dateFrom = new Date(new Date().toLocaleDateString() + ' ' + "10:00");

    const handleClickOpenDone = () => {
        const temp = dateFrom.toISOString().slice(0, 19).replace('T', ' ');
        if (new Date(deliveryTime.date).toString() != 'Invalid Date') {
            const avaliableDeliveryDate = new Date(new Date(deliveryTime.date).toDateString() + ' ' + deliveryTime.time).toISOString().slice(0, 19).replace('T', ' ');
            if (avaliableDeliveryDate > temp) {
                axios({
                    method: 'post',
                    url: `http://localhost:8877/api/cart/order`,
                    headers: { Authorization: `Bearer ${userToken}` },
                    data: { avaliableDeliveryDate: avaliableDeliveryDate }
                }).then(result => {
                    setOpen(false);
                    setValidDate(true);
                    return setOpenDone(true);
                }).catch((error) => {
                    if (error.response) {
                        if (error.response.status == 403 || error.response.status == 401) {
                            localStorage.removeItem('accessToken');
                            return navigate(`/${lang}/login`, { replace: false });
                        } else if (error.response.status == 400) {
                            return setValidDate(false);
                        }
                    }
                });
            } else {
                return setValidDate(false);
            }
        } else {
            return setValidDate(false);
        }
    }

    const handleCloseDone = () => {
        setOpenDone(false);
        navigate('/', { replace: true })
    };

    const [shoppingProducts, setShoppingProducts] = useState([]);
    const [shippingInfo, setShippingInfo] = useState({});
    const getShippingProducts = () => {
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
    }
    useEffect(() => {
        if (!token) {
            return navigate('/', { replace: true });
        };
        window.scrollTo(0, 0);
        axios({
            method: 'get',
            url: `http://localhost:8877/api/cart/${lang}/shipping-info`,
            headers: { Authorization: `Bearer ${token}` }
        }).then((result) => {
            return setShippingInfo(result.data.data[0])
        }).catch((error) => {
            if (error.response) {
                if (error.response.status == 403 || error.response.status == 401) {
                    localStorage.removeItem('accessToken');
                    sessionStorage.removeItem('accessToken');
                    return navigate(`/${lang}/login`, { replace: true });
                } else if (error.response.status == 424) {
                    if (userToken) {
                        return navigate(`/${lang}/select-my-address`, { replace: true });
                    } else if (guestToken) {
                        return navigate(`/${lang}/add-new-address`, { replace: true });
                    }
                }
            }
        });
        getShippingProducts();
    }, []);

    const getShippingInf = () => {
        axios({
            method: 'get',
            url: `http://localhost:8877/api/cart/${lang}/shipping-info`,
            headers: { Authorization: `Bearer ${token}` }
        }).then((result) => {
            return setShippingInfo(result.data.data[0])
        }).catch((error) => {
            if (error.response) {
                if (error.response.status == 403 || error.response.status == 401) {
                    localStorage.removeItem('accessToken');
                    sessionStorage.removeItem('accessToken');
                    return navigate(`/${lang}/login`, { replace: true });
                } else if (error.response.status == 424) {
                    if (userToken) {
                        return navigate(`/${lang}/select-my-address`, { replace: true });
                    } else if (guestToken) {
                        return navigate(`/${lang}/add-new-address`, { replace: true });
                    }
                }
            }
        });
    }
    const [promoCode, setPromoCode] = useState('');
    const handlePromoCode = () => {
        axios({
            method: 'put',
            url: `http://localhost:8877/api/cart/discount`,
            headers: { Authorization: `Bearer ${token}` },
            data: { shippingId: shippingInfo.shippingId, promoCode: promoCode }
        }).then((result) => {
            setInvalidPromoCode(false);
            setPromoCode('');
            setValidPromoCode(true);
            getShippingInf();
            const timer = setTimeout(() => {
                setInvalidPromoCode(false);
                setPromoCode('');
                setValidPromoCode(false);
                return () => clearTimeout(timer);
            }, 2000);
        }).catch((error) => {
            if (error.response) {
                if (error.response.status == 403 || error.response.status == 401) {
                    localStorage.removeItem('accessToken');
                    sessionStorage.removeItem('accessToken');
                    return navigate(`/${lang}/login`, { replace: true });
                } else if (error.response.status == 424) {
                    if (userToken) {
                        return navigate(`/${lang}/select-my-address`, { replace: true });
                    } else if (guestToken) {
                        return navigate(`/${lang}/add-new-address`, { replace: true });
                    }
                } else {
                    setInvalidPromoCode(true);
                    setValidPromoCode(false);
                    const timer = setTimeout(() => {
                        setInvalidPromoCode(false);
                        setValidPromoCode(false);
                        return () => clearTimeout(timer);
                    }, 2000);
                }
            }
        });
    };


    return (
        <ThemeProvider theme={CustomTheme}>
            <Container sx={{ mt: 15, mb: 20 }}>
                <Grid justifyContent='space-between' container columns={24}>
                    <Grid item xs={24} sm={20} md={12} sx={{ mb: { xs: 5, md: 0 }, marginLeft: 'auto', marginRight: 'auto' }} >
                        <Typography gutterBottom sx={{ mb: 5, ...(lang == 'ar' && { 'direction': 'rtl' }) }} variant='h4'>{transition[lang].sipa}</Typography>
                        <AddressCard address={shippingInfo} enableDelete={false} enableEdit={true} />
                        <Box sx={{ mt: 5 }}>
                            <TextField id="promoCode" name="promoCode" label={transition[lang].pc} variant="standard" type="text"
                                value={promoCode} onChange={(e) => setPromoCode(e.target.value)}
                                helperText={invalidPromoCode ? InvalidText : validPromoCode && valideText}
                                autoComplete="off"
                                InputProps={{
                                    disableUnderline: true,
                                }}
                                sx={{
                                    width: '83%',
                                    height: '67.5px',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    padding: '5px',
                                    outline: 'none',
                                    border: 'none',
                                    backgroundColor: '#fff',
                                    boxShadow: '0px 3px 6px 0px #0000002e',
                                    borderRadius: '15px',
                                    fontSize: '20px',
                                    "& .MuiFormLabel-root": {
                                        paddingLeft: '15px',
                                        color: '#aaa',
                                        fontSize: '18px'
                                    }
                                }} />
                            <Button
                                sx={{
                                    backgroundColor: 'var(--secondary)',
                                    borderRadius: '15px',
                                    padding: '18px 30px',
                                    fontSize: '18px',
                                    fontWeight: '500',
                                    boxShadow: '0px 3px 6px 0px #0000002e',
                                    width: '20%',
                                    marginLeft: '-25px',
                                    '&:hover': {
                                        backgroundColor: 'var(--primary)'
                                    }
                                }}
                                variant='Contained'
                                onClick={handlePromoCode}
                            >{transition[lang].ad}</Button>
                        </Box>
                        <Button
                            className={classes.btn}
                            sx={{ width: '100%', mt: 8, padding: '10px 10px', fontWeight: '400' }}
                            onClick={handleClickOpen}
                        >{transition[lang].conf}</Button>
                    </Grid>

                    <Grid
                        item
                        sx={{ marginLeft: 'auto', marginRight: 'auto' }}
                        xs={24}
                        sm={20}
                        md={11}
                        className={classes.container}>
                        <ReviewOrders shippingPrice={shippingInfo?.shippingPrice} discount={shippingInfo?.discount} orders={shoppingProducts} getShippingProducts={getShippingProducts} />
                    </Grid>
                </Grid>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    sx={{
                        backgroundColor: 'rgb(0 0 0 / 0%)', mb: 15,
                        '.MuiPaper-root': {
                            borderRadius: '15px'
                        }
                    }}
                >
                    <DialogContent sx={{ p: 4, textAlign: 'center', width: '550px' }}>
                        <Typography gutterBottom sx={{
                            fontWeight: '600',
                            fontSize: '18px',
                            pb: 5,
                            color: '#000'
                        }}>{transition[lang].sadd}</Typography>
                        {!validDate && <Alert sx={{ width: '80%', m: 'auto', mb: 5 }} variant="outlined" severity="error">
                            {transition[lang].adtm} <br />{dateFrom.toString().slice(0, 21)} AM
                        </Alert>}
                        <Box >
                            <TextField
                                variant='standard'
                                type="date"
                                name='date'
                                value={deliveryTime.date}
                                onChange={handleDeliveryTime}
                                sx={{
                                    width: '80%',
                                    mb: 5
                                }} />
                            <br />
                            <Box sx={{ width: '80%', m: 'auto', display: 'flex', justifyContent: 'space-between' }}>
                                <Typography component='span' variant='body1' sx={{ height: '25px', mt: '4px', width: '25%' }}>10:00 AM - </Typography>
                                <TextField
                                    variant='standard'
                                    type="time"
                                    sx={{
                                        width: '75%',
                                        //  mt: 3,
                                    }}
                                    name='time'
                                    value={deliveryTime.time}
                                    onChange={handleDeliveryTime}
                                />
                            </Box>
                        </Box>
                        <Button
                            className={classes.btn}
                            sx={{ mt: 4, padding: '15px 25px' }}
                            onClick={handleClickOpenDone}
                        >{transition[lang].conf}</Button>
                    </DialogContent>
                </Dialog>
                <Dialog
                    open={openDone}
                    onClose={handleCloseDone}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    sx={{
                        backgroundColor: 'rgb(0 0 0 / 0%)', mb: 15,
                        '.MuiPaper-root': {
                            borderRadius: '15px'
                        }
                    }}
                >
                    <DialogContent sx={{ p: 8, textAlign: 'center', width: '550px' }}>
                        <Box sx={{ position: 'relative', height: '150px', marginLeft: '-10px' }}>
                            <img src='/images/Group 46542.png' style={{ position: 'absolute', top: 0, left: '173px', width: '90px' }} alt='logo' />
                            <img src='/images/Group 47196.png' style={{ position: 'absolute', top: 0, left: '180px', width: '80px' }} alt='logo' />
                        </Box>
                        <Typography variant='h6'>{transition[lang].uo}<br />{transition[lang].hba}</Typography>
                        <Typography variant='body2' sx={{
                            fontSize: '18px',
                            color: '#979797',
                            fontWeight: '300',
                            mt: 5
                        }}>{transition[lang].iwtb}<br />{transition[lang].yihb}</Typography>
                        <Button
                            className={classes.btn}
                            sx={{ mt: 8, padding: '15px 25px' }}
                            href="/"
                        >{transition[lang].bth}</Button>
                    </DialogContent>
                </Dialog>
            </Container>
        </ThemeProvider >
    );
};

export default ShippingAddress;


