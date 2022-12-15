import React, { useState } from 'react'
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import useStyles from '../MakeStyles';
import IconButton from '@mui/material/IconButton';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import CustomTheme from '../Theme';
import { ThemeProvider } from '@mui/material/styles';
import AppleIcon from '@mui/icons-material/Apple';
import Container from '@mui/material/Container';
import Arabic from '../Arabic';
import English from '../English';


const title = {
    fontWeight: '700',
    fontSize: '16px',
    mb: 2,
}

const linksContainer = {
    display: 'flex',
    flexDirection: { xs: 'row', md: 'column' },
    justifyContent: 'space-around',

}

const about_customer = {
    width: { xs: '100%', md: 'auto' },
    mt: 5
}

const Items = {
    textDecoration: 'none',
    color: 'black',
    display: 'block',
    fontSize: '14px',
    fontWeight: '400',
    textTransform: 'capitalize',
}

const iconsContainer = {
    display: 'flex',
    justifyContent: 'space-around'
}

const socialIconBtn = {
    color: '#000',
    backgroundColor: 'var(--primary)',
    height: '45px',
    width: '45px'
}

const socialIcons = {
    height: '35px',
    width: '35px'
}

const iconBtns = {
    color: '#000',
    backgroundColor: 'var(--primary)',
    height: '50px',
    width: '50px'
}

const imgIcons = {
    height: '45px',
    width: '45px',
    cursor: 'pointer'
}

const Footer = () => {
    const transition = {
        ar: Arabic,
        en: English
    }
    let lang = localStorage.getItem('lang') !== null ? localStorage.getItem('lang') : 'en';
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const handleChange = (e) => {
        setEmail(e.target.value);
    }

    return (
        <ThemeProvider theme={CustomTheme}>
            <Box
                sx={{
                    backgroundImage: `url(/images/footer.png)`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    mt: 6,
                    pt: 5,
                    pb: 10,
                    backgroundColor: 'var(--bg)'
                }}
            >
                <Container>

                    <Typography sx={{ textAlign: 'center', mb: 5 }} variant='h4'>{transition[lang].jon}</Typography>
                    <Box
                        sx={{
                            textAlign: 'center',
                            mb: 8,
                        }}>
                        <TextField id="name" name="name" label="Your email@domail.com" variant="standard" type="text"
                            value={email}
                            onChange={handleChange}
                            autoComplete="off"
                            className={classes.footer_fields}
                            InputProps={{
                                disableUnderline: true,
                            }}
                            sx={{
                                width: { xs: '70%', sm: '60%', md: '35%' },
                                marginLeft: 'auto',
                                marginRight: 'auto',
                            }}
                        />
                        <Button
                            size='large'
                            className={classes.btn}
                            sx={{ marginLeft: '-20px', width: { xs: '120px', md: '200px' }, padding: '10px 10px' }}
                            onClick={() => console.log(email)}
                        >{transition[lang].sub}</Button>
                    </Box>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-start', width: '100%' }}>

                        <Box sx={about_customer}>
                            <Typography variant='h1' sx={title} gutterBottom>{transition[lang].au}</Typography>
                            <Box sx={linksContainer}>
                                <Button href={`/${lang}/about`} sx={Items}>{transition[lang].au}</Button>
                                <Button href={`/${lang}/contact`} sx={Items}>{transition[lang].cu}</Button>
                                <Button href={`/${lang}/privacy-policy`} sx={Items}>{transition[lang].pp}</Button>
                                <Button href={`/${lang}/term-of-use`} sx={Items}>{transition[lang].tou}</Button>
                                <Button href={`/${lang}/FAQ`} sx={Items}>{transition[lang].faq}</Button>
                            </Box>
                        </Box>

                        <Box sx={about_customer}>
                            <Typography variant='h1' sx={title} gutterBottom>{transition[lang].cc}</Typography>
                            <Box sx={linksContainer}>
                                <Button href={`/${lang}/contact`} sx={Items}>{transition[lang].cu}</Button>
                                <Button href={`/${lang}/info-center`} sx={Items}>{transition[lang].ice}</Button>
                                <Button href={`/${lang}/shipping-returns`} sx={Items}>{transition[lang].sar}</Button>
                            </Box>
                        </Box>

                        <Box sx={{ width: { xs: '50%', md: 'auto' }, mt: 5, ...(lang == 'ar' && { 'direction': 'rtl' }) }}>
                            <Typography variant='h1' sx={title} gutterBottom>{transition[lang].ywl}</Typography>
                            <Typography sx={{ ...Items, mb: 2 }}>{transition[lang].qp}</Typography>
                            <Typography sx={{ ...Items, mb: 2 }}>{transition[lang].fsw}</Typography>
                            <Typography sx={{ ...Items, mb: 2 }} >{transition[lang].fsh}</Typography>
                            <Typography sx={{ ...Items, mb: 2 }}>{transition[lang].rcs}</Typography>
                        </Box>

                        {/* icons list */}
                        <Box sx={{ mt: -1, width: { xs: '50%', md: '230px' }, height: '180px', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', mt: 5 }}>
                            <Box sx={iconsContainer}>
                                <IconButton sx={socialIconBtn}>
                                    <FacebookRoundedIcon sx={socialIcons} />
                                </IconButton>
                                <IconButton sx={socialIconBtn}>
                                    <InstagramIcon sx={socialIcons} />
                                </IconButton>
                                <IconButton sx={socialIconBtn}>
                                    <WhatsAppIcon sx={socialIcons} />
                                </IconButton>
                                <IconButton sx={socialIconBtn}>
                                    <MailOutlineOutlinedIcon sx={socialIcons} />
                                </IconButton>
                            </Box>
                            <Box sx={iconsContainer}>
                                <IconButton sx={iconBtns}>
                                    <img src='/images/maestro.svg' style={imgIcons} />
                                </IconButton>
                                <IconButton sx={iconBtns}>
                                    <img src='/images/paypal.svg' style={imgIcons} />
                                </IconButton>
                                <IconButton sx={iconBtns}>
                                    <img src='/images/visa.svg' style={imgIcons} />
                                </IconButton>
                            </Box>
                            <Box sx={iconsContainer}>
                                <IconButton sx={iconBtns}>
                                    <AppleIcon sx={{ height: '45px', width: '45px' }} />
                                </IconButton>
                                <IconButton sx={iconBtns}>
                                    <img src='/images/android.svg' style={imgIcons} />
                                </IconButton>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Box >
        </ThemeProvider >
    );
};

export default Footer;