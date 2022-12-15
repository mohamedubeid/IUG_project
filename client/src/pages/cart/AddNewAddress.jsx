import React, { useState, useEffect, useMemo } from 'react';
import CustomTheme from '../../Theme';
import { ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import useStyles from '../../MakeStyles';
import Grid from '@mui/material/Grid';
import ReviewOrders from '../../components/client/ReviewOrders';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Arabic from '../../Arabic';
import English from '../../English';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormError from '../../components/shared/FormError';
import FormHelperText from '@mui/material/FormHelperText';
import cartSchema from '../../validation/cartSchema';
import { ContactsOutlined } from '@mui/icons-material';


const AddNewAddress = () => {
    const classes = useStyles();
    const transition = {
        ar: Arabic,
        en: English
    };
    let lang = localStorage.getItem('lang') !== null ? localStorage.getItem('lang') : 'en';
    const [shippingAddress, setShippingAddress] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        shippingId: '',
        area: '',
        street: '',
        house: ''
    });
    const handleShippingAddress = (event) => {
        const { name, value } = event.target;
        setShippingAddress({
            ...shippingAddress,
            [name]: value,
        });

    };
    const navigate = useNavigate();
    const location = useLocation();
  //  const addressId = location.state?.id;
    const [addressId, setAddressId] = useState(location.state?.id)
    const guestToken = sessionStorage.getItem('accessToken');
    const [shoppingProducts, setShoppingProducts] = useState([]);
    const getShippingProducts = () => {
        axios({
            method: 'get',
            url: `http://localhost:8877/api/cart/${lang}/products`,
            headers: { Authorization: `Bearer ${guestToken}` }
        }).then((result) => {
            return setShoppingProducts(result.data.data)
        }).catch((error) => {
            if (error.response) {
                if (error.response.status == 403 || error.response.status == 401) {
                    sessionStorage.removeItem('accessToken');
                    localStorage.removeItem('accessToken');
                    return navigate(`/${lang}/login`, { replace: true });
                }
            }
        });
    };

    const [cities, setCitites] = useState(null);
    const handleChange = (event) => {
        setShippingAddress({
            ...shippingAddress,
            ['shippingId']: event.target.value,
        });
    };
    console.log(location.state?.id, 'addressId')
    useEffect(() => {
        if (!guestToken) {
            return navigate('/', { replace: true });
        }
        window.scrollTo(0, 0);
        if (addressId) {
            axios({
                method: 'get',
                url: `http://localhost:8877/api/cart/guest/shipping-address`,
                headers: { Authorization: `Bearer ${guestToken}` },
            }).then((result) => {
                console.log(result.data.data, '****');
                return setShippingAddress(result.data.data[0]);
            });
        };
        axios({
            method: 'get',
            url: `http://localhost:8877/api/${lang}/shipping`,
        }).then((result) => {
            return setCitites(result.data.data);
        });

        getShippingProducts();
    }, []);
    const items = useMemo(() => cities?.map(item => {
        return <MenuItem value={item.shippingId} key={item.shippingId}>{item.city.toString()}</MenuItem>
    }), [cities]);


    const [formError, setError] = useState({});
    const handleConfirmButton = () => {
        const result = cartSchema.addShippingAddressForm.validate(shippingAddress);
        const { error } = result;
        if (error) {
            const errorData = {};
            for (let item of error.details) {
                const name = item.path[0];
                const message = item.message;
                errorData[name] = message;
            }
            return setError(errorData);
        }
        if (addressId) {
            axios({
                method: 'put',
                url: `http://localhost:8877/api/cart/guest/shipping-address/${addressId}`,
                data: shippingAddress,
                headers: { Authorization: `Bearer ${guestToken}` },
            }).then((result) => {
                return navigate(`/${lang}/shipping-address`, { replace: true });
            }).catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    if (error.response.status == 403 || error.response.status == 401) {
                        sessionStorage.removeItem('accessToken');
                        localStorage.removeItem('accessToken');
                        return navigate(`/${lang}/login`, { replace: true });
                    }
                }
            });
        } else {
            axios({
                method: 'post',
                url: `http://localhost:8877/api/cart/guest/shipping-address`,
                data: shippingAddress,
                headers: { Authorization: `Bearer ${guestToken}` },
            }).then((result) => {
                return navigate(`/${lang}/shipping-address`, { replace: true });
            }).catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    if (error.response.status == 403 || error.response.status == 401) {
                        sessionStorage.removeItem('accessToken');
                        localStorage.removeItem('accessToken');
                        return navigate(`/${lang}/login`, { replace: true });
                    } else if (error.response.status == 409) {
                        setError({ email: error.response.data.msg });
                    }
                }
            });
        }
    };

    return (
        <ThemeProvider theme={CustomTheme}>
            <Container sx={{ mt: 15, mb: 20, ...(lang == 'ar' && { 'direction': 'rtl' }) }}>
                <Grid justifyContent='space-between' container columns={24}>
                    <Grid item xs={24} sm={18} md={12} sx={{ mb: { xs: 5, md: 0 }, marginLeft: 'auto', marginRight: 'auto' }} >
                        <Typography gutterBottom sx={{ mb: 5 }} variant='h4'><IconButton href={addressId ? `/${lang}/shipping-address` : `/${lang}/shopping-cart`}><KeyboardBackspaceIcon fontSize='large' sx={{ mr: 1, color: '#000', ...(lang == 'ar' && { transform: "scaleX(-1)" }) }} /></IconButton>{addressId ? transition[lang].uya : transition[lang].adna}</Typography>
                        <Box sx={{ textAlign: 'center', width: { xs: '100%', md: '90%' } }}>
                            <TextField id="name" name="name" label={transition[lang].fn} variant="standard" type="text"
                                helperText={formError['name'] ? <FormError text={formError['name']} /> : null}
                                className={classes.contact_fields}
                                InputProps={{
                                    disableUnderline: true,
                                }}
                                sx={{ mt: 1.5, mb: 1.5, width: '100%' }}
                                value={shippingAddress.name}
                                onChange={handleShippingAddress}
                                onKeyDown={e => e.keyCode == 13 && handleConfirmButton()}
                            />
                            <TextField id="email" name="email" label={transition[lang].e} variant="standard" type="email"
                                helperText={formError['email'] ? <FormError text={formError['email']} /> : null}
                                className={classes.contact_fields}
                                InputProps={{
                                    disableUnderline: true,
                                }}
                                sx={{ mt: 1.5, mb: 2, width: '100%' }}
                                value={shippingAddress.email}
                                onChange={handleShippingAddress}
                                onKeyDown={e => e.keyCode == 13 && handleConfirmButton()}
                            />
                            <TextField id="phoneNumber" name="phoneNumber" label={transition[lang].pon} variant="standard" type="tel"
                                helperText={formError['phoneNumber'] ? <FormError text={formError['phoneNumber']} /> : null}
                                className={classes.contact_fields}
                                InputProps={{
                                    disableUnderline: true,
                                }}
                                sx={{ mb: 1.5, width: '100%' }}
                                value={shippingAddress.phoneNumber}
                                onChange={handleShippingAddress}
                                onKeyDown={e => e.keyCode == 13 && handleConfirmButton()}
                            />
                            <InputLabel sx={{ textAlign: 'left', color: '#ccd' }}>{transition[lang].city}</InputLabel>
                            <Select
                                value={cities ? shippingAddress.shippingId : ""}
                                className={classes.contact_fields}
                                onChange={handleChange}
                                sx={{ mt: 1.5, mb: 1.5, width: '100%' }}
                                label="City"
                                MenuProps={{
                                    PaperProps: {
                                        style: {
                                            borderRadius: '15px'
                                        },
                                    },
                                }}
                            >
                                {items}
                            </Select>
                            <FormHelperText>{formError["shippingId"] ? <FormError text={formError["shippingId"]} /> : null}</FormHelperText>
                            <TextField id="area" name="area" label={transition[lang].ari} variant="standard" type="text" required
                                helperText={formError['area'] ? <FormError text={formError['area']} /> : null}
                                className={classes.contact_fields}
                                InputProps={{
                                    disableUnderline: true,
                                }}
                                sx={{ mt: 1.5, mb: 1.5, width: '100%' }}
                                value={shippingAddress.area}
                                onChange={handleShippingAddress}
                                onKeyDown={e => e.keyCode == 13 && handleConfirmButton()}
                            />
                            <TextField id="street" name="street" label={transition[lang].st} variant="standard" type="text" required
                                helperText={formError['street'] ? <FormError text={formError['street']} /> : null}
                                className={classes.contact_fields}
                                InputProps={{
                                    disableUnderline: true,
                                }}
                                sx={{ mt: 1.5, mb: 1.5, width: '100%' }}
                                value={shippingAddress.street}
                                onChange={handleShippingAddress}
                                onKeyDown={e => e.keyCode == 13 && handleConfirmButton()}
                            />
                            <TextField id="house" name="house" label={transition[lang].ho} variant="standard" type="text" required
                                helperText={formError['house'] ? <FormError text={formError['house']} /> : null}
                                className={classes.contact_fields}
                                InputProps={{
                                    disableUnderline: true,
                                }}
                                sx={{ mt: 1.5, mb: 1.5, width: '100%' }}
                                value={shippingAddress.house}
                                onChange={handleShippingAddress}
                                onKeyDown={e => e.keyCode == 13 && handleConfirmButton()}
                            />
                            <Button
                                className={classes.btn}
                                sx={{ width: '100%', mt: 8, padding: '10px 10px', fontWeight: '400' }}
                                onClick={handleConfirmButton}
                            >{transition[lang].conf}</Button>
                        </Box>
                    </Grid>
                    <Grid
                        sx={{ marginLeft: 'auto', marginRight: 'auto' }}
                        item
                        xs={24}
                        sm={18}
                        md={11}>
                        <Box className={classes.container}><ReviewOrders orders={shoppingProducts} /></Box>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    )
}

export default AddNewAddress;




