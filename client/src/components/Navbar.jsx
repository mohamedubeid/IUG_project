import React, { useState } from 'react';
import LanguageIcon from '@mui/icons-material/Language';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Container from '@mui/material/Container';
import { Link } from "react-router-dom";
import CustomTheme from '../Theme';
import { ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import LoginIcon from '@mui/icons-material/Login';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import Arabic from '../Arabic';
import English from '../English';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const searchNav = {
    fontWeight: '300',
    pt: '4px',
}

const link = {
    color: 'var(--ternary)',
    textDecoration: 'none'
}
const menuItem = {
    color: 'var(--ternary)',
    '.css-1tfeiaa-MuiTypography-root': {
        display: 'inline-block',
    }
}


const Navbar = () => {

    const transition = {
        ar: Arabic,
        en: English
    };
    const userToken = localStorage.getItem('accessToken');
    const isLogin = userToken == null ? false : true;
    const path = window.location.href.split('/');
    path.splice(0, 3);

    /* language menu */
    const [anchorEl_lang, setAnchorEl_lang] = useState(null);
    const open_lang = Boolean(anchorEl_lang);
    const handleClick_lang = (event) => {
        setAnchorEl_lang(event.currentTarget);
    };
    const handleClose_lang = () => {
        setAnchorEl_lang(null);
    };
    let lang = localStorage.getItem('lang') !== null ? localStorage.getItem('lang') : 'en';
    const handleChangeLang = (event) => {
        localStorage.setItem('lang', event.currentTarget.dataset.myValue);
        const path = window.location.href.split('/');
        path.splice(0, 4);
        window.history.replaceState(null, null, `/${event.currentTarget.dataset.myValue}/${path.join('/')}`);
        document.location.reload();

    };

    /* language menu */
    /* categories menu */


    /* categories menu */
    /*  profile menu */
    const [anchorEl_prof, setAnchorEl_prof] = useState(null);
    const open_prof = Boolean(anchorEl_prof);
    const handleClick_prof = (event) => {
        setAnchorEl_prof(event.currentTarget);
    };
    const handleClose_prof = () => {
        setAnchorEl_prof(null);
    };
    /*  profile menu */

    /*Search*/

    const [enableSearch, setEnableSearch] = useState(false);
    const [search, setSearch] = useState('');
    const handleSearch = (e) => {
        setSearch(e.target.value);
    }
    /*Drawer */
    const [state, setState] = useState(false);
    const toggleDrawer = (open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }
        setState(open);
    };
    const list = (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List component="nav">
                {[{ en: 'HOME', ar: `${transition[lang].h}` }, { en: 'CATAGORIES', ar: `${transition[lang].cat}` }, { en: 'NEW', ar: `${transition[lang].n}` }, { en: 'OFFERS', ar: `${transition[lang].o}` }, { en: 'CONTACT US', ar: `${transition[lang].cu}` }, { en: 'ABOUT US', ar: `${transition[lang].au}` }].map((nav) => {
                    return (
                        <Box key={nav.en}>
                            <ListItem button key={nav.en} sx={{ '&:hover': { backgroundColor: '#eee' }, fontSize: '16px' }}>
                                <Link to={`/${lang}/${nav.en != 'HOME' ? nav.en.toLowerCase().split(" ")[0] : ''}`} style={{ textDecoration: 'none', color: 'black', width: '100%' }}>
                                    {nav.ar}
                                </Link>
                            </ListItem>
                            <Divider />
                        </Box>
                    )
                })}
            </List>
        </Box>
    );
    /**Drawer */
    const navigate = useNavigate();


    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        axios({
            method: 'delete',
            url: `http://localhost:8877/api/logout`,
            headers: { Authorization: `Bearer ${userToken}` }
        });
        return navigate(`/${lang}/login`, { replace: true });
    };

    return (
        <ThemeProvider theme={CustomTheme}>

            {/* Start first nav */}
            <Box sx={{ backgroundColor: 'var(--primary)', height: '100px', position: 'relative' }}>
                {enableSearch ?
                    <Box sx={{ position: 'absolute', backgroundColor: '#ffF', width: '100%', height: '300px', top: '100px', zIndex: '30' }}>
                        <Container sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <Box sx={{ color: '#000', fontWeight: '100', pt: 10, pr: 10 }}>
                                <Typography gutterBottom sx={{ fontWeight: '300' }}>POPULAR SEARCHES</Typography>
                                <Typography sx={searchNav}>Dresses</Typography>
                                <Typography sx={searchNav} >Shoes</Typography>
                                <Typography sx={searchNav} >Headfone</Typography>
                                <Typography sx={searchNav} >Sport Shoes</Typography>
                            </Box>
                            <Box sx={{ color: '#000', fontWeight: '100', pt: 10, pr: 10 }}>
                                <Typography gutterBottom sx={{ fontWeight: '300' }}>POPULAR SEARCHES</Typography>
                                <Typography sx={searchNav}>Dresses</Typography>
                                <Typography sx={searchNav} >Shoes</Typography>
                                <Typography sx={searchNav} >Headfone</Typography>
                                <Typography sx={searchNav} >Sport Shoes</Typography>
                            </Box>
                        </Container>
                    </Box>
                    :
                    null}
                <Container >
                    {enableSearch ?
                        <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100px', width: '350px' }} >
                                <IconButton href={search.trim().length >= 3 ? `/${lang}/search/${search.trim()}` : null}
                                    sx={{ color: '#000' }}>
                                    <SearchIcon />
                                </IconButton>
                                <TextField
                                    helperText={search.trim().length >= 3 ? '' : 'Type text to search (min 3 chars)'}
                                    autoFocus onKeyDown={(e) => {
                                        if (e.keyCode == 13 && search.trim().length >= 3) {
                                            window.location.href = `/${lang}/search/${search.trim()}`;
                                        }
                                    }} id="search" label="Search" variant="standard" autoComplete="off"
                                    color='black_n'
                                    value={search}
                                    onChange={handleSearch}
                                />
                                <IconButton sx={{ color: '#000' }} onClick={() => {
                                    setEnableSearch(false);
                                }}>
                                    <ClearIcon />
                                </IconButton>
                            </Box>

                        </Box>
                        :
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: 'center', height: "100px" }}>
                            {/* Start language Icon & Menu */}
                            <Box>
                                <IconButton
                                    id="lang-button"
                                    aria-controls={open_lang ? 'language-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open_lang ? 'true' : undefined}
                                    onClick={handleClick_lang}
                                    sx={{ width: { xs: '30px', md: '67.42px' }, height: { xs: '20px', md: '37px' } }}

                                >
                                    <Box sx={{ color: 'black', display: 'flex' }}>
                                        <ArrowDropDownIcon sx={{ width: { xs: '20px', sm: '32px' }, height: { xs: '25px', sm: '32px' } }} />
                                        <LanguageIcon sx={{ width: { xs: '20px', sm: '32px' }, height: { xs: '25px', sm: '32px' } }} />
                                    </Box>
                                </IconButton>
                                <Menu
                                    sx={{
                                        ...(lang == 'ar' && { 'direction': 'rtl' })
                                    }}
                                    id="lang-button"
                                    anchorEl={anchorEl_lang}
                                    open={open_lang}
                                    onClose={handleClose_lang}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                    PaperProps={{
                                        sx: {
                                            width: '140px'
                                        },
                                    }}
                                >
                                    <MenuItem onClick={handleChangeLang}
                                        sx={{ color: 'var(--ternary)' }} data-my-value='en'>
                                        <ListItemText sx={{ display: 'inline-block' }}>{transition[lang].en}</ListItemText>
                                    </MenuItem>
                                    <MenuItem onClick={handleChangeLang} sx={{ color: 'var(--ternary)' }} data-my-value='ar'>
                                        <ListItemText sx={{ display: 'inline-block' }}>{transition[lang].ar}</ListItemText>
                                    </MenuItem>
                                </Menu>
                            </Box>
                            {/* end language Icon & Menu 
                                {/* Logo */}
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', marginLeft: { xs: '5%', sm: '5%' }, width: { xs: '140px', sm: '200px' }, height: { xs: '70px', sm: '90px' } }}>
                                <img src='/images/Group 47196.png' alt="logo" style={{ width: '45%', height: '100%' }} />
                                <img src='/images/Pido.png' alt="logo" style={{ width: '55%', height: '70%', marginBottom: '-6px', marginLeft: '-10px' }} />
                            </Box>
                            {/* Logo */}
                            {/*  Start Nav Actions */}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                {/*  Search */}
                                <IconButton aria-label="search"
                                    sx={{ width: { xs: '25px', sm: '32px' }, height: { xs: '25px', sm: '32px' }, mr: 2 }}
                                    onClick={() => {
                                        setEnableSearch(true);
                                    }}>
                                    <SearchIcon sx={{ width: { xs: '25px', sm: '32px' }, height: { xs: '25px', sm: '32px' }, color: '#000' }} />
                                </IconButton>
                                {/* Cart */}
                                <IconButton aria-label="cart" href={`/${lang}/shopping-cart`} sx={{ width: { xs: '25px', sm: '32px' }, height: { xs: '25px', sm: '32px' }, mr: 2 }}
                                >
                                    <ShoppingBagOutlinedIcon sx={{ width: { xs: '25px', sm: '32px' }, height: { xs: '25px', sm: '32px' }, color: '#000' }} />
                                </IconButton>
                                {/* Start Profile Icon & Menu */}
                                <IconButton aria-label="profile"
                                    onClick={handleClick_prof}
                                    aria-controls={open_prof ? 'account-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open_prof ? 'true' : undefined}
                                    sx={{ width: { xs: '25px', sm: '32px' }, height: { xs: '25px', sm: '32px' }, }}

                                >
                                    <PersonOutlineIcon sx={{ width: { xs: '25px', sm: '32px' }, height: { xs: '25px', sm: '32px' }, color: open_prof ? '#fff' : '#000', borderBottom: open_prof ? '3px solid #fff' : null }} />
                                </IconButton>

                                {/* Start Profile Menu */}
                                <Menu
                                    anchorEl={anchorEl_prof}
                                    id="account-menu"
                                    open={open_prof}
                                    onClose={handleClose_prof}
                                    onClick={handleClose_prof}
                                    PaperProps={{
                                        sx: {
                                            overflow: 'visible',
                                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                            mt: 1.5,
                                            borderRadius: '15px',
                                            marginLeft: { xs: '0%', sm: '1%', md: '3%', lg: '6%' },
                                            padding: '20px 8px',
                                        },
                                    }}
                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                >
                                    {isLogin ?
                                        < Box >
                                            <Link to={`/${lang}/my-profile`} style={link}>
                                                <MenuItem sx={menuItem}>
                                                    <ListItemIcon >
                                                        <AccountCircleOutlinedIcon fontSize="small" />
                                                    </ListItemIcon>
                                                    <ListItemText sx={{ display: 'inline-block' }}>{transition[lang].mp}</ListItemText>
                                                </MenuItem>
                                            </Link>

                                            <Link to={`/${lang}/my-addresses`} style={link}>
                                                <MenuItem sx={menuItem}>

                                                    <ListItemIcon >
                                                        <LocationOnOutlinedIcon fontSize="small" />
                                                    </ListItemIcon>
                                                    <ListItemText sx={{ display: 'inline-block' }}>{transition[lang].ma}</ListItemText>

                                                </MenuItem>
                                            </Link>
                                            <Link to={`/${lang}/my-orders`} style={link}>
                                                <MenuItem sx={menuItem}>

                                                    <ListItemIcon >
                                                        <InboxOutlinedIcon fontSize="small" />
                                                    </ListItemIcon>
                                                    <ListItemText sx={{ display: 'inline-block' }}>{transition[lang].mo}</ListItemText>
                                                </MenuItem>
                                            </Link>
                                            <Link to={`/${lang}/my-favorites`} style={link}>

                                                <MenuItem sx={menuItem}>
                                                    <ListItemIcon >
                                                        <FavoriteBorderOutlinedIcon fontSize="small" />
                                                    </ListItemIcon>
                                                    <ListItemText sx={{ display: 'inline-block' }}>{transition[lang].mf}</ListItemText>
                                                </MenuItem>
                                            </Link>
                                            <Link to={`/${lang}/change-password`} style={link}>

                                                <MenuItem sx={menuItem}>
                                                    <ListItemIcon >
                                                        <HttpsOutlinedIcon fontSize="small" />
                                                    </ListItemIcon>
                                                    <ListItemText sx={{ display: 'inline-block' }}>{transition[lang].cp}</ListItemText>
                                                </MenuItem>
                                            </Link>

                                            <MenuItem sx={{ color: 'var(--ternary)' }} onClick={handleLogout}>
                                                <ListItemIcon>
                                                    <LogoutOutlinedIcon fontSize="small" />
                                                </ListItemIcon>
                                                <ListItemText>{transition[lang].lo}</ListItemText>
                                            </MenuItem>
                                        </Box>
                                        :
                                        <Box sx={{ padding: '25px 40px', display: 'flex', flexDirection: 'column' }}>
                                            <Button variant="outlined" startIcon={<LoginIcon />}
                                                href={`/${lang}/login`}
                                                sx={{
                                                    padding: '10px',
                                                    borderRadius: '20px',
                                                    boxShadow: '0px 1px 8px -3px #000000',
                                                    color: '#000',
                                                    fontWeight: '700',
                                                    fontSize: '16px',
                                                    mb: '10px',
                                                    '&:hover': {
                                                        backgroundColor: 'var(--primary)',
                                                        color: '#fff',
                                                    }
                                                }}>
                                                {transition[lang].li}
                                            </Button>
                                            <Button variant="text"
                                                href={`/${lang}/sign-up`}
                                                sx={{
                                                    textDecoration: 'underline',
                                                    textTransform: 'capitalize',
                                                    borderRadius: '20px',
                                                    fontSize: '16px',
                                                    '&:hover': {
                                                        backgroundColor: 'var(--primary)',
                                                        color: '#fff'
                                                    }
                                                }}
                                            >
                                                {transition[lang].su}
                                            </Button>
                                        </Box>
                                    }
                                </Menu>
                                {/* End Profile Menu */}
                                {/* End Profile Icon & Menu */}
                            </Box>

                            {/* Start Nav Menu Icon  (Drawer)*/}
                            <Box
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                    color: '#000'
                                }}
                            >
                                <IconButton
                                    aria-label="menu"
                                    size='large'
                                    onClick={toggleDrawer(true)}
                                >
                                    <MenuIcon fontSize='large' sx={{ width: { xs: '28px', sm: '32px' }, height: { xs: '28px', sm: '32px' }, color: '#000' }} />
                                </IconButton>
                                <SwipeableDrawer
                                    anchor='right'
                                    open={state}
                                    onClose={toggleDrawer(false)}
                                    onOpen={toggleDrawer(true)}
                                >
                                    {list}
                                </SwipeableDrawer>
                            </Box>
                            {/* End Nav Menu Icon  (Drawer)*/}
                        </Box>
                    }

                </Container>
            </Box >

            {/* end first nav */}
            {/* Start Second Nav */}

            <ThemeProvider theme={CustomTheme}>
                <Box sx={{ backgroundColor: '#fff', boxShadow: '0px 3px 6px 0px #0000002e', position: 'relative', zIndex: 20 }}  >
                    < Box sx={{ display: { xs: 'none', md: 'flex' }, width: { sm: '95%', md: '80%', lg: '55%' }, height: '90px', alignItems: 'center', justifyContent: 'space-between', marginLeft: 'auto', marginRight: 'auto', fontSize: '16px' }}>
                        <Link to={`/${lang}`} style={{ textDecoration: 'none', color: 'black' }}>
                            {transition[lang].h}
                        </Link>
                        <Link to={`/${lang}/catagories`} style={{ textDecoration: 'none', color: 'black' }}>
                            {transition[lang].cat}
                        </Link>


                        <Link to={`/${lang}/new`} style={{ textDecoration: 'none', color: 'black' }}>
                            {transition[lang].n}
                        </Link>
                        <Link to={`/${lang}/offers`} style={{ textDecoration: 'none', color: 'black' }}>
                            {transition[lang].o}
                        </Link>
                        <Link to={`/${lang}/contact`} style={{ textDecoration: 'none', color: 'black' }}>
                            {transition[lang].cu}
                        </Link>
                        <Link to={`/${lang}/about`} style={{ textDecoration: 'none', color: 'black' }}>
                            {transition[lang].au}
                        </Link>
                    </Box >
                </Box >
            </ThemeProvider>

        </ThemeProvider >
    );
};

export default Navbar;
