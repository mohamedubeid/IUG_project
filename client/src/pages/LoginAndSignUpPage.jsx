import React, { useState, useEffect } from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import CustomTheme from '../Theme';
import { ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import useStyles from '../MakeStyles';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Arabic from '../Arabic';
import English from '../English';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import loginSchemas from '../validation/loginSchema';
import FormError from '../components/shared/FormError';
const label = {
    fontSize: '26px',
    fontWeight: '700',
    width: '40%',
    '&.Mui-selected': {
        color: '#000',
    },
}


const LoginAndSignUpPage = (props) => {
    const navigate = useNavigate();
    const [resStatus, setResStatus] = useState(0);
    const [resMsg, setResMsg] = useState('');
    let path = window.location.href.split('/');
    path.splice(0, 3);
    const [value, setValue] = useState(`${path == 'sign-up' ? '2' : '1'}`);
    const handleChange = (event, newValue) => {
        setValue(newValue);
        navigate(`/${lang}/${newValue == '1' ? 'login' : 'sign-up'}`);
        setResMsg('');
        setResStatus(0);
    };

    let lang = localStorage.getItem('lang') !== null ? localStorage.getItem('lang') : 'en';
    const classes = useStyles();

    const [login, setLogin] = useState({
        email: '',
        password: '',
        remember: false,
    });
    const handleLogin = (event) => {
        const { name, value } = event.target;
        setLogin({
            ...login,
            [name]: value,
        });
    };
    const [loginErrors, setLoginErrors] = useState({});
    const submitLogin = () => {
        const result = loginSchemas.loginForm.validate(login);
        const { error } = result;
        if (error) {
            const errorData = {};
            for (let item of error.details) {
                const name = item.path[0];
                const message = item.message;
                errorData[name] = message;
            }
            return setLoginErrors(errorData);
        }
        setLoginErrors('');
        axios({
            method: 'post',
            url: `http://localhost:8877/api/login`,
            data: login
        }).then(result => {
            setResMsg(result.data.msg);
            setResStatus(result.status);
            localStorage.setItem('accessToken', result.data.accessToken);
            sessionStorage.removeItem('accessToken');
            return navigate("/", { replace: true });
        })
            .catch((error) => {
                if (error.response) {
                    setResMsg(error.response.data.msg);
                    return setResStatus(error.response.status);
                };
            });
    }

    const [signUp, setSignUp] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        password: '',
        conPassword: '',
    });
    const handleSignUp = (event) => {
        const { name, value } = event.target;
        setSignUp({
            ...signUp,
            [name]: value,
        });
    };
    const [signupErrors, setSignupErrors] = useState({});

    const submitSignUp = () => {
        const result = loginSchemas.registerForm.validate(signUp);
        const { error } = result;
        if (error) {
            const errorData = {};
            for (let item of error.details) {
                const name = item.path[0];
                const message = item.message;
                errorData[name] = message;
            }
            return setSignupErrors(errorData);
        }
        setSignupErrors('');
        axios({
            method: 'post',
            url: `http://localhost:8877/api/register`,
            data: signUp
        })
            .then(result => {
                setResMsg(result.data.msg);
                setResStatus(result.status);
            })
            .catch((error) => {
                if (error.response) {
                    setResMsg(error.response.data.msg);
                    return setResStatus(error.response.status);
                };
            });
    };


    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const userToken = localStorage.getItem('accessToken');
    useEffect(() => {
        window.scrollTo(0, 0);
        if (userToken) {
            navigate('/', { replace: true });
        }
        if (path[1] == 'login') {
            setValue('1');
        } else {
            setValue('2')
        };
    }, []);
    const transition = {
        ar: Arabic,
        en: English
    };
    return (
        <ThemeProvider theme={CustomTheme}>
            <Container sx={{ mt: 15, mb: 20, ...(lang == 'ar' && { 'direction': 'rtl' }) }}>
                <Typography gutterBottom variant='h4' color='#000' >{transition[lang].mal}</Typography>
                <Box sx={{ width: { xs: '100%', md: '70%' }, typography: 'body1', marginLeft: 'auto', marginRight: 'auto' }}>
                    <TabContext value={value} >
                        <Box>
                            <TabList onChange={handleChange} centered sx={{
                                '& .MuiTabs-indicator': {
                                    height: '6px',
                                    borderRadius: '15px',
                                    backgroundColor: 'var(--secondary)'
                                },
                            }}>
                                <Tab label={`${transition[lang].log}`} value='1' sx={label}
                                />
                                <Tab label={`${transition[lang].ca}`} value="2" variant='h4' color='#000' sx={label}
                                />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <Box sx={{ mt: 6 }}>
                                <TextField id="email" name="email" label={transition[lang].e} variant="standard" type="email"
                                    helperText={loginErrors["email"] ? <FormError text={loginErrors["email"]} /> : null}
                                    className={classes.contact_fields}
                                    InputProps={{
                                        disableUnderline: true,
                                    }}
                                    sx={{ mt: 1, mb: 1, width: '100%' }}
                                    value={login.name}
                                    onChange={handleLogin}
                                    onKeyDown={e => e.keyCode == 13 && submitLogin()}
                                />
                                <TextField id="password" name="password" label={transition[lang].pass} variant="standard" type="password"
                                    helperText={loginErrors["password"] ? <FormError text={loginErrors["password"]} /> : null}
                                    className={classes.contact_fields}
                                    InputProps={{
                                        disableUnderline: true,
                                    }}
                                    sx={{ mt: 2, mb: 2, width: '100%' }}
                                    value={login.password}
                                    onChange={handleLogin}
                                    onKeyDown={e => e.keyCode == 13 && submitLogin()}
                                />
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                                    <FormControlLabel control={<Checkbox />} label={transition[lang].rem} sx={{
                                        color: '#969696',
                                        '.MuiFormControlLabel-label': {
                                            fontSize: '18px',
                                            fontWeight: '400',
                                        }
                                    }}
                                        name='remember'
                                        checked={login.remember}
                                        onChange={(event) => {
                                            setLogin({
                                                ...login,
                                                [event.target.name]: event.target.checked,
                                            });
                                        }}
                                    />
                                    <Button onClick={handleClickOpen}
                                        variant='text'
                                        sx={{ color: '#969696', fontSize: '18px', fontWeight: '400' }} >{transition[lang].for}</Button>
                                </Box>
                                {resStatus !== 0 && <Alert severity={`${resStatus >= 200 && resStatus < 400 ? 'success' : 'error'}`}>{resMsg}</Alert>}
                                <Button
                                    className={classes.btn}
                                    sx={{ mt: 10, padding: '15px 20px', width: '100%' }}
                                    onClick={submitLogin}
                                >{transition[lang].sig}</Button>
                            </Box>
                        </TabPanel>
                        <TabPanel value='2'>
                            <Box sx={{ mt: 6 }}>
                                <TextField id="name2" name="name" label={transition[lang].fn} variant="standard" type="text"
                                    helperText={signupErrors["name"] ? <FormError text={signupErrors["name"]} /> : null}
                                    className={classes.contact_fields}
                                    InputProps={{
                                        disableUnderline: true,
                                    }}
                                    sx={{ mt: 1, mb: 1, width: '100%' }}
                                    value={signUp.name}
                                    onChange={handleSignUp}
                                    onKeyDown={e => e.keyCode == 13 && submitLogin()}
                                />
                                <TextField id="email" name="email" label={transition[lang].e} variant="standard" type="email"
                                    helperText={signupErrors["email"] ? <FormError text={signupErrors["email"]} /> : null}
                                    className={classes.contact_fields}
                                    InputProps={{
                                        disableUnderline: true,
                                    }}
                                    sx={{ mt: 3, mb: 2, width: '100%' }}
                                    value={signUp.email}
                                    onChange={handleSignUp}
                                    onKeyDown={e => e.keyCode == 13 && submitLogin()}
                                />
                                <TextField id="phoneNumber" name="phoneNumber" label={transition[lang].pon} variant="standard" type="text"
                                    helperText={signupErrors["phoneNumber"] ? <FormError text={signupErrors["phoneNumber"]} /> : null}
                                    className={classes.contact_fields}
                                    InputProps={{
                                        disableUnderline: true,
                                    }}
                                    sx={{ mt: 3, mb: 2, width: '100%' }}
                                    value={signUp.phoneNumber}
                                    onChange={handleSignUp}
                                    onKeyDown={e => e.keyCode == 13 && submitLogin()}
                                />
                                <TextField id="password" name="password" label={transition[lang].pass} variant="standard" type="password"
                                    helperText={signupErrors["password"] ? <FormError text={signupErrors["password"]} /> : null}
                                    autoComplete='off'
                                    className={classes.contact_fields}
                                    InputProps={{
                                        disableUnderline: true,
                                    }}
                                    sx={{ mt: 3, mb: 2, width: '100%' }}
                                    value={signUp.password}
                                    onChange={handleSignUp}
                                    onKeyDown={e => e.keyCode == 13 && submitLogin()}
                                />
                                <TextField id="conPassword" name="conPassword" label={transition[lang].conpass} variant="standard" type="password"
                                    helperText={signupErrors["conPassword"] ? <FormError text={signupErrors["conPassword"]} /> : null}
                                    autoComplete="off"
                                    className={classes.contact_fields}
                                    InputProps={{
                                        disableUnderline: true,
                                    }}
                                    FormHelperTextProps={{
                                        className: classes.helperText
                                    }}
                                    sx={{ mt: 3, mb: 2, width: '100%' }}
                                    value={signUp.conPassword}
                                    onChange={handleSignUp}
                                    onKeyDown={e => e.keyCode == 13 && submitLogin()}
                                />
                                {resStatus !== 0 && <Alert severity={`${resStatus >= 200 && resStatus < 400 ? 'success' : 'error'}`}>{resMsg}</Alert>}
                                <Button
                                    className={classes.btn}
                                    sx={{ mt: 10, padding: '15px 20px', width: '100%' }}
                                    onClick={() => submitSignUp()}
                                >{transition[lang].snup}</Button>
                            </Box>
                        </TabPanel>
                    </TabContext>
                </Box>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    sx={{
                        backgroundColor: 'rgb(0 0 0 / 0%)',
                        borderRadius: '150px',
                        '.MuiPaper-root': {
                            borderRadius: '15px'
                        }
                    }}
                >
                    <DialogContent sx={{ p: 8, borderRadius: '150px' }}>
                        <Typography gutterBottom sx={{
                            fontWeight: '700',
                            fontSize: '22px',
                            pb: 1,
                            textAlign: 'center'
                        }}>Forgot Your Password</Typography>
                        <Typography variant='body2' sx={{
                            fontSize: '15px',
                            color: '#979797',
                            fontWeight: '300'
                        }}>Provide your account email address to receive and email to reset your password.</Typography>
                        <Box sx={{ mt: 5 }}>
                            <TextField id="email" name="email" label="E-Mail" variant="standard" type="email"
                                fullWidth
                                InputProps={{
                                    disableUnderline: true,
                                }}
                                className={classes.contact_fields}
                                sx={{ mb: 5 }}
                            />
                            <Button
                                sx={{ width: '100%', padding: '10px 10px' }}
                                className={classes.btn}
                                href='/login'
                            >Send</Button>
                        </Box>
                    </DialogContent>
                </Dialog>
            </Container >
        </ThemeProvider >
    );
};
export default LoginAndSignUpPage;


