import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import useStyles from '../../MakeStyles';
import Arabic from '../../Arabic';
import English from '../../English';
import userSchema from '../../validation/userSchema';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NotifyUser from '../../components/shared/NotifyUser';
import FormError from '../../components/shared/FormError';
import Alert from '@mui/material/Alert';
import CustomTheme from '../../Theme';
import { ThemeProvider } from '@mui/material/styles';


const ChangePassword = () => {
    const classes = useStyles();
    const [changePassword, setChangePassword] = useState({
        email: '',
        oldPassword: '',
        newPassword: ''
    });
    const transition = {
        ar: Arabic,
        en: English
    };
    const navigate = useNavigate();

    const handleChangePassword = (event) => {
        const { name, value } = event.target;
        setChangePassword({
            ...changePassword,
            [name]: value,
        });
    };
    let lang = localStorage.getItem('lang') !== null ? localStorage.getItem('lang') : 'en';
    const userToken = localStorage.getItem('accessToken');

    const [inputError, setInputError] = useState({});
    const [open, setOpen] = useState(false);
    const [text, setText] = useState('');
    const [isAlert, setAlert] = useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const handleChange = () => {
        const result = userSchema.changePasswordForm.validate(changePassword);
        const { error } = result;
        if (error) {
            const errorData = {};
            for (let item of error.details) {
                const name = item.path[0];
                const message = item.message;
                errorData[name] = message;
            }
            return setInputError(errorData);
        }
        setInputError('');

        axios({
            method: 'put',
            url: `http://localhost:8877/api/change-password`,
            data: changePassword,
            headers: { Authorization: `Bearer ${userToken}` },
        }).then((result) => {
            setText(result.data.msg);
            setOpen(true);
            setAlert(false);
        }).catch((error) => {
            if (error.response) {
                setText(error.response.data.msg);
                setAlert(true);
                if (error.response.status == 403 || error.response.status == 401) {
                    localStorage.removeItem('accessToken');
                    return navigate(`/${lang}/login`, { replace: true });
                };
            };
        });
    }

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
                    <Typography gutterBottom variant='h4' color='#000' sx={{ mb: 4 }}>
                        {transition[lang].cp}</Typography>
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

                        <TextField id="email" name="email" label={`${transition[lang].e}`} variant="standard" type="email"
                            helperText={inputError["email"] ? <FormError text={inputError["email"]} /> : null}
                            InputProps={{
                                disableUnderline: true,
                            }}
                            className={classes.contact_fields}
                            value={changePassword.email}
                            onChange={handleChangePassword}
                        />
                        <TextField id="oldPassword" name="oldPassword" label={`${transition[lang].op}`} variant="standard" type="password"
                            helperText={inputError["oldPassword"] ? <FormError text={inputError["oldPassword"]} /> : null}
                            className={classes.contact_fields}
                            InputProps={{
                                disableUnderline: true,
                            }}
                            value={changePassword.oldPassword}
                            onChange={handleChangePassword}
                        />
                        <TextField
                            type="password"
                            id="newPassword"
                            variant="standard"
                            label={`${transition[lang].np}`}
                            helperText={inputError["newPassword"] ? <FormError text={inputError["newPassword"]} /> : null}
                            className={classes.contact_fields}
                            InputProps={{
                                disableUnderline: true,
                            }}
                            name="newPassword"
                            value={changePassword.newPassword}
                            onChange={handleChangePassword}
                        />
                        {isAlert ? <Alert severity="error">{text}</Alert> : null}

                        <Button
                            size='large'
                            onClick={handleChange}
                            className={classes.btn}
                            sx={{
                                width: '100%', marginLeft: 'auto', marginRight: 'auto', padding: '10px 10px', mt: 5
                            }}
                        >{transition[lang].ch}</Button>
                        <NotifyUser severity={"success"} open={open} handleClose={handleClose} text={text} />

                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default ChangePassword;