import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import React, { useState, useEffect, useMemo } from 'react';
import CustomTheme from '../../Theme';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AddressCard from '../../components/client/AddressCard';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';


const SelectMyAddress = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const [addresses, setAddresses] = useState([])
    const handleChange = (event) => {
        const temp = event.target.value;
        setSelectedValue(temp);
        axios({
            method: 'put',
            url: `http://localhost:8877/api/cart/adresses/${temp}`,
            headers: { Authorization: `Bearer ${userToken}` }
        }).then((result) => {
            return navigate(`/${lang}/shipping-address`, { replace: true });
        })
    };
    let lang = localStorage.getItem('lang') !== null ? localStorage.getItem('lang') : 'en';
    const navigate = useNavigate();
    const location = useLocation();
    const userToken = localStorage.getItem('accessToken');
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
    const addresses_cards = useMemo(() => addresses.map((add, i) =>
        <Box sx={{ mt: 2, mb: 2 }} key={i}>
            <AddressCard
                selectedValue={selectedValue == add?.id || location?.state?.id == add?.id}
                handleChange={handleChange}
                selectAddress={true}
                address={add}
                enableDelete={true}
            />
        </Box>
    ), [addresses]);
    return (
        <ThemeProvider theme={CustomTheme}>
            <Container sx={{ mt: 15, mb: 20 }}>
                <Typography gutterBottom variant='h4' color='#000'>MY ADDRESSES</Typography>
                {addresses_cards}
            </Container>
        </ThemeProvider >
    );
};

export default SelectMyAddress;