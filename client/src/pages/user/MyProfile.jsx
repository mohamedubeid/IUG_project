import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import useStyles from '../../MakeStyles';
import Arabic from '../../Arabic';
import English from '../../English';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NotifyUser from '../../components/shared/NotifyUser';
import userSchema from '../../validation/userSchema';
import FormError from '../../components/shared/FormError';
import CustomTheme from '../../Theme';
import { ThemeProvider } from '@mui/material/styles';


const MyProfile = () => {
    const classes = useStyles();

    const transition = {
        ar: Arabic,
        en: English
    };

    const [open, setOpen] = useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const [text, setText] = useState('');
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        phoneNumber: '',
    });
    let lang = localStorage.getItem('lang') !== null ? localStorage.getItem('lang') : 'en';
    const [upDisabled, setUpDisabled] = useState(true);

    const handleProfile = (event) => {
        const { name, value } = event.target;
        setProfile({
            ...profile,
            [name]: value,
        });
        if (upDisabled) {
            setUpDisabled(false);
        }
    };
    const [formError, setError] = useState({});
    const navigate = useNavigate();
    const userToken = localStorage.getItem('accessToken');
    const handleUpdate = () => {
        const result = userSchema.profileForm.validate(profile);
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
            url: `http://localhost:8877/api/my-profile`,
            data: profile,
            headers: { Authorization: `Bearer ${userToken}` },
        }).then((result) => {
            setText(result.data.msg)
            setOpen(true);
            setUpDisabled(true);
        }).catch((error) => {
            if (error.response.status == 403 || error.response.status == 401) {
                localStorage.removeItem('accessToken');
                return navigate(`/${lang}/login`, { replace: true });
            }
        });
    }

    useEffect(() => {
        if (!userToken) {
            return navigate('/', { replace: true });
        };

        axios({
            method: 'get',
            url: `http://localhost:8877/api/my-profile`,
            headers: { Authorization: `Bearer ${userToken}` }
        }).then((result) => {
            return setProfile(result.data.data[0]);
        }).catch((error) => {
            if (error.response) {
                if (error.response.status == 403 || error.response.status == 401) {
                    localStorage.removeItem('accessToken');
                    return navigate(`/${lang}/login`, { replace: true });
                }
            }
        });
        window.scrollTo(0, 0);
    }, []);

    return (
        <ThemeProvider theme={CustomTheme}>
            <Container sx={{ mt: 15, mb: 20, ...(lang == 'ar' && { 'direction': 'rtl' }) }}>
                <Box
                    sx={{
                        width: { xs: '100%', sm: '80%', md: '55%', lg: '50%' },
                        marginLeft: { xs: 'auto', lg: 0 },
                        marginRight: { xs: 'auto', lg: 0 },
                    }}
                >
                    <Typography gutterBottom variant='h4' color='#000' sx={{ mb: 4 }}>{transition[lang].mp}</Typography>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': {
                                mb: 3,
                            },
                            display: 'flex',
                            flexDirection: 'column',
                            flexGrow: 20,
                            paddingLeft: '20px',
                            mt: 5,
                            ml: { xs: 8, md: 0 },
                            mr: { xs: 8, md: 0 },
                        }}
                        autoComplete="off"
                    >
                        <TextField id="name" name="name" label={`${transition[lang].fn}`} variant="standard" type="text"
                            className={classes.contact_fields}
                            helperText={formError["name"] ? <FormError text={formError["name"]} /> : null}
                            InputProps={{
                                disableUnderline: true,
                            }}
                            value={profile.name}
                            onChange={handleProfile}
                            onKeyDown={e => e.keyCode == 13 && handleUpdate()}
                        />
                        <TextField id="email" name="email" label={`${transition[lang].e}`} variant="standard" type="email"
                            helperText={formError["email"] ? <FormError text={formError["email"]} /> : null}
                            InputProps={{
                                disableUnderline: true,
                            }}
                            className={classes.contact_fields}
                            value={profile.email}
                            onChange={handleProfile}
                            onKeyDown={e => e.keyCode == 13 && handleUpdate()}

                        />
                        <TextField
                            id="phoneNumber"
                            variant="standard"
                            helperText={formError["phoneNumber"] ? <FormError text={formError["phoneNumber"]} /> : null}
                            label={`${transition[lang].pon}`}
                            className={classes.contact_fields}
                            InputProps={{
                                disableUnderline: true,
                            }}
                            name="phoneNumber"
                            value={profile.phoneNumber}
                            onChange={handleProfile}
                            onKeyDown={e => e.keyCode == 13 && handleUpdate()}
                        />
                        <Button
                            size='large'
                            onClick={handleUpdate}
                            className={classes.btn}
                            sx={{
                                width: '100%', marginLeft: 'auto', marginRight: 'auto', padding: '10px 10px', mt: 5
                            }}
                            disabled={upDisabled}
                        >{transition[lang].up}</Button>
                    </Box>
                </Box>
                <NotifyUser severity={"success"} open={open} handleClose={handleClose} text={text} />
            </Container>
        </ThemeProvider>
    );
};

export default MyProfile;