import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import React, { useState, useEffect, useMemo } from 'react';
import CustomTheme from '../../Theme';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import AddressCard from '../../components/client/AddressCard';
import Arabic from '../../Arabic';
import English from '../../English';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NotifyUser from '../../components/shared/NotifyUser';
import LocationOffIcon from '@mui/icons-material/LocationOff';
import HelperText from '../../components/shared/HelperText';



const MyAddresses = () => {
    const transition = {
        ar: Arabic,
        en: English
    };
    let lang = localStorage.getItem('lang') !== null ? localStorage.getItem('lang') : 'en';
    const navigate = useNavigate();
    const userToken = localStorage.getItem('accessToken');
    const [addresses, setAddresses] = useState([]);
    useEffect(() => {
        if (!userToken) {
            return navigate('/', { replace: true });
        }
        window.scrollTo(0, 0);
        axios({
            method: 'get',
            url: `http://localhost:8877/api/${lang}/my-addresses`,
            headers: { Authorization: `Bearer ${userToken}` }
        }).then((result) => {
            return setAddresses(result.data.data)
        }).catch((error) => {
            if (error.response) {
                if (error.response.status == 403 || error.response.status == 401) {
                    localStorage.removeItem('accessToken');
                    return navigate(`/${lang}/login`, { replace: true });
                }
            }
        });
    }, []);
    const [open, setOpen] = useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const [text, setText] = useState('');
    const deleteAddress = (id) => {
        axios({
            method: 'delete',
            url: `http://localhost:8877/api/my-addresses/${id}`,
            headers: { Authorization: `Bearer ${userToken}` },
        }).then((result) => {
            setText(result.data.msg)
            setOpen(true);
        }).catch((error) => {
            if (error.response) {
                if (error.response.status == 403 || error.response.status == 401) {
                    localStorage.removeItem('accessToken');
                    return navigate(`/${lang}/login`, { replace: true });
                }
            }

        });
        setAddresses(addresses.filter(add => { return add.id != id }));
    };
    console.log(addresses, '///////////');
    let addresses_cards = useMemo(() => addresses?.map((add) =>
        <Box sx={{ mt: 2, mb: 2 }} key={add.id}>
            <AddressCard
                address={add}
                enableDelete={true}
                enableEdit={true}
                deleteAddress={deleteAddress}
            />
        </Box>
    ), [addresses]);
    return (
        <ThemeProvider theme={CustomTheme}>
            <Container sx={{ mt: 15, mb: 20, ...(lang == 'ar' && { 'direction': 'rtl' }) }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center' }}>
                    <Typography gutterBottom variant='h4' color='#000'>{transition[lang].ma}</Typography>
                    <Button href={`/${lang}/add-new-shipping-address`} variant="text" sx={{ color: '#6b6666', fontSize: '20px', fontWeight: '400', mt: { xs: 5, sm: 0 } }} size='large' startIcon={<AddIcon sx={{ width: '35px', height: '35px' }} />}>
                        {transition[lang].ana}
                    </Button>
                </Box>
                {addresses_cards.length !== 0 ?
                    addresses_cards
                    :
                    <HelperText
                        text={'yhaa'}
                        icon={LocationOffIcon}
                        color={'#666'}
                        style={{ mt: 3, display: 'flex', width: '100%', justifyContent: 'center', color: '#666', backgroudColor: 'var(--secondary)' }}
                    />
                }
            </Container>
            <NotifyUser severity={"success"} open={open} handleClose={handleClose} text={text} />
        </ThemeProvider >
    )
};

export default MyAddresses;