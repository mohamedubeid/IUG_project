import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import useStyles from '../../MakeStyles';
import CustomTheme from '../../Theme';
import { ThemeProvider } from '@mui/material/styles';
import Arabic from '../../Arabic';
import English from '../../English';


const ContactUsForm = () => {

    const transition = {
        ar: Arabic,
        en: English
    }
    let lang = localStorage.getItem('lang') !== null ? localStorage.getItem('lang') : 'en';

    const classes = useStyles();
    const [contact, setContact] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleContact = (event) => {
        const { name, value } = event.target;
        setContact({
            ...contact,
            [name]: value,
        });
    };

    return (
        <ThemeProvider theme={CustomTheme}>
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
                    ...(lang == 'ar' && { 'direction': 'rtl' })
                }}
                autoComplete="off"
            >
                <TextField id="name" name="name" label={`${transition[lang].fn}`} variant="standard" type="text"
                    className={classes.contact_fields}
                    InputProps={{
                        disableUnderline: true,
                    }}
                    value={contact.name}
                    onChange={handleContact}
                />
                <TextField id="email" name="email" label={`${transition[lang].e}`} variant="standard" type="email"
                    InputProps={{
                        disableUnderline: true,
                    }}
                    className={classes.contact_fields}
                    value={contact.email}
                    onChange={handleContact}
                />
                <TextField
                    id="message"
                    variant="standard"
                    label={`${transition[lang].ym}`}
                    multiline
                    rows={6}
                    InputProps={{
                        disableUnderline: true,
                    }}
                    name="message"
                    value={contact.message}
                    onChange={handleContact}
                    sx={{
                        padding: '15px',
                        outline: 'none',
                        border: 'none',
                        backgroundColor: '#fff',
                        boxShadow: '0px 3px 6px 0px #0000002e',
                        borderRadius: '17px',
                        fontSize: '20px',
                        "& .MuiFormLabel-root": {
                            paddingLeft: '15px',
                            paddingTop: '5px',
                            color: '#ccd',
                            fontSize: '17px',
                            fontWeight: '200'
                        }
                    }}
                />
                <Button
                    size='large'
                    onClick={() => console.log(contact)}
                    className={classes.btn}
                    sx={{
                        width: { xs: '120px', md: '170px' }, marginLeft: 'auto', marginRight: 'auto', padding: '10px 10px',
                    }}
                >{`${transition[lang].s}`}</Button>

            </Box>
        </ThemeProvider >

    );
};

export default ContactUsForm