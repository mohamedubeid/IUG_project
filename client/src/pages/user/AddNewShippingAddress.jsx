import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import React, { useState, useEffect, useMemo } from 'react';
import CustomTheme from '../../Theme';
import { ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import useStyles from '../../MakeStyles';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import Arabic from '../../Arabic';
import English from '../../English';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import NotifyUser from '../../components/shared/NotifyUser';
import userSchema from '../../validation/userSchema';
import FormError from '../../components/shared/FormError';
import FormHelperText from '@mui/material/FormHelperText';




const AddNewShippingAddress = () => {
    const classes = useStyles();
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const [upDisabled, setUpDisabled] = useState(true);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const [text, setText] = useState('');
    const [formError, setError] = useState({});
    const [shippingAddress, setShippingAddress] = useState({
        shippingId: '',
        area: '',
        street: '',
        house: '',
        isDefault: 0
    });
    const handleShippingAddress = (event) => {
        const { name, value } = event.target;
        setShippingAddress({
            ...shippingAddress,
            [name]: value,
        });
        if (upDisabled) {
            setUpDisabled(false);
        }
    };
    const navigate = useNavigate();
    const userToken = localStorage.getItem('accessToken');
    const handleSubmit = () => {
        if (location.state) {
            const result = userSchema.addressForm.validate(shippingAddress);
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
            setError('');

            axios({
                method: 'put',
                url: `http://localhost:8877/api/my-addresses/${location.state.address.id}`,
                data: shippingAddress,
                headers: { Authorization: `Bearer ${userToken}` },
            }).then((result) => {

                setText(result.data.msg)
                setOpen(true);
                setUpDisabled(true);
                const timer = setTimeout(() => {
                    navigate(`/${lang}/my-addresses`, { replace: true });
                    return () => clearTimeout(timer);
                }, 700);
            }).catch((error) => {
                if (error.response) {
                    if (error.response.status == 403 || error.response.status == 401) {
                        localStorage.removeItem('accessToken');
                        return navigate(`/${lang}/login`, { replace: true });
                    }
                }
            });

        } else {
            //add axios
            const result = userSchema.addressForm.validate(shippingAddress);
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
            setError('');
            axios({
                method: 'post',
                url: `http://localhost:8877/api/my-addresses`,
                data: shippingAddress,
                headers: { Authorization: `Bearer ${userToken}` },
            }).then((result) => {
                setText(result.data.msg)
                setOpen(true);
                setShippingAddress({
                    shippingId: '', //shippingId
                    area: '',
                    street: '',
                    house: '',
                    isDefault: 0
                });
            }).catch((error) => {
                if (error.response) {
                    if (error.response.status == 403 || error.response.status == 401) {
                        localStorage.removeItem('accessToken');
                        return navigate(`/${lang}/login`, { replace: true });
                    }
                }
            });
        }
    }
    const [cities, setCitites] = useState(null);
    const handleChange = (event) => {
        setShippingAddress({
            ...shippingAddress,
            ['shippingId']: event.target.value,
        });
        if (upDisabled) {
            setUpDisabled(false);
        }
    };

    useEffect(() => {
        if (!userToken) {
            return navigate('/', { replace: true });
        };
        if (location.state) {
            const op = location.state.address;
            console.log(location.state.address, '*************');
            setShippingAddress({
                shippingId: op.shippingId,
                area: op.area,
                street: op.street,
                house: op.house,
                isDefault: op.isDefault
            });
        };
        axios({
            method: 'get',
            url: `http://localhost:8877/api/${lang}/shipping`,
        }).then((result) => {
            return setCitites(result.data.data);
        });
        window.scrollTo(0, 0);
    }, []);
    const transition = {
        ar: Arabic,
        en: English
    };
    let lang = localStorage.getItem('lang') !== null ? localStorage.getItem('lang') : 'en';
    const items = useMemo(() => cities?.map(item => {
        return <MenuItem value={item.shippingId} key={item.shippingId}>{item.city.toString()}</MenuItem>
    }), [cities]);
    console.log(shippingAddress, 'aaaaa')
    return (
        <ThemeProvider theme={CustomTheme}>
            <Container sx={{ mt: 15, mb: 20 }}>
                <Typography gutterBottom variant='h4' color='#000'>{location.state ? transition[lang].usa : transition[lang].nsa}</Typography>

                <Grid container spacing={10} direction={{ xs: 'column-reverse', sm: 'column-reverse', md: 'row', lg: 'row', xl: 'row', }}>
                    <Grid item xs={10} md={7}
                        component='form'
                        sx={{
                            '& .MuiTextField-root': {
                                mb: 2,
                                mt: 2,
                                maxWidth: '650px'
                            },
                            marginLeft: 'auto',
                            marginRight: 'auto'
                        }}
                    >
                        <InputLabel sx={{ textAlign: 'left', color: '#ccd' }}>{transition[lang].city}</InputLabel>
                        <Select
                            value={cities ? shippingAddress.shippingId : ""}
                            className={classes.contact_fields}
                            onChange={handleChange}
                            sx={{ width: '100%', }}
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
                        <TextField id='area' name='area' label='Area' variant='standard' type='text'
                            helperText={formError['area'] ? <FormError text={formError['area']} /> : null}
                            className={classes.contact_fields}
                            InputProps={{
                                disableUnderline: true,
                            }}
                            value={shippingAddress.area}
                            onChange={handleShippingAddress}
                            sx={{ width: '100%' }}
                            onKeyDown={e => e.keyCode == 13 && handleSubmit()}
                        />
                        <TextField fullWidth id="street" name="street" label="Street" variant="standard" type="text"
                            className={classes.contact_fields}
                            helperText={formError["street"] ? <FormError text={formError["street"]} /> : null}
                            InputProps={{
                                disableUnderline: true,
                            }}
                            value={shippingAddress.street}
                            onChange={handleShippingAddress}
                            onKeyDown={e => e.keyCode == 13 && handleSubmit()}
                        />
                        <TextField fullWidth id="house" name="house" label="House" variant="standard" type="text"
                            helperText={formError["house"] ? <FormError text={formError["house"]} /> : null}
                            className={classes.contact_fields}
                            InputProps={{
                                disableUnderline: true,
                            }}
                            value={shippingAddress.house}
                            onChange={handleShippingAddress}
                            onKeyDown={e => e.keyCode == 13 && handleSubmit()}
                        />
                        <FormControlLabel control={<Checkbox />} label="Default" sx={{
                            '.MuiFormControlLabel-label': {
                                fontSize: '18px',
                                fontWeight: '400',
                            },
                            display: 'block'
                        }}
                            name='isDefault'
                            checked={shippingAddress.isDefault == 0 ? false : true}
                            onChange={(event) => {
                                setShippingAddress({
                                    ...shippingAddress,
                                    ['isDefault']: event.target.checked == true ? 1 : 0,
                                });
                                setUpDisabled(false);
                            }} />
                        <Button
                            className={classes.btn}
                            sx={{ mt: 10, padding: '15px 20px', width: '100%' }}
                            onClick={handleSubmit}
                            disabled={upDisabled && location.state != null}
                        >{location.state ? transition[lang].up : transition[lang].ad}</Button>
                    </Grid>
                    <Grid item xs={10} md={5} sx={{ marginLeft: 'auto', marginRight: 'auto' }} >
                        <img src='/images/Group 46553.png' alt='address-desc-image' style={{ width: '100%', maxWidth: '550px', height: 'auto' }} />
                    </Grid>
                </Grid>
            </Container>
            <NotifyUser severity={"success"} open={open} handleClose={handleClose} text={text} />
        </ThemeProvider >
    )
}

export default AddNewShippingAddress;