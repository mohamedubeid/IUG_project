import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import React from 'react';
import CustomTheme from '../../Theme';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import useStyles from '../../MakeStyles';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import IconButton from '@mui/material/IconButton';
import Arabic from '../../Arabic';
import English from '../../English';

const button = {
    backgroundColor: '#fff',
    color: '#000',
    padding: '14px 40px',
    borderRadius: '10px',
    webkitBoxShadow: '0px 3px 6px 0px #0000002e',
    boxShadow: '0px 3px 6px 0px #0000002e',
    fontSize: '19px',
    fontWeight: '700',
    width: { xs: '190px', md: '180px', lg: '195px' },
    m: 2,
    textTransform: 'capitalize',
    '&:hover': {
        backgroundColor: 'var(--primary)',
    }
}


/*

    const userToken = localStorage.getItem('accessToken');


   if (userToken) {
            navigate('/', { replace: true });
        }


        useMemo

                window.scrollTo(0, 0);

*/

const MyOrders = () => {

    const transition = {
        ar: Arabic,
        en: English
    };
    let lang = localStorage.getItem('lang') !== null ? localStorage.getItem('lang') : 'en';

    const orders = [
        {
            id: '22018452',
            price: 165,
            date: '03/12/2021',
            state: 'New'

        },
        {
            id: '22018452',
            price: 165,
            date: '03/12/2021',
            state: 'In Progress'

        },
        {
            id: '22018452',
            price: 165,
            date: '03/12/2021',
            state: 'On Delivery'

        },
        {
            id: '22018452',
            price: 165,
            date: '03/12/2021',
            state: 'Completed'

        }
    ];
    const cards = orders.map((order, i) => {
        return <Card order={order} lang={lang} key={i} />
    })
    return (
        <ThemeProvider theme={CustomTheme}>
            <Container sx={{ mt: 15, mb: 20 }}>
                <Typography gutterBottom variant='h4' color='#000' sx={{ textTransform: 'uppercase', ...(lang == 'ar' && { 'direction': 'rtl' }) }}>{transition[lang].mo}</Typography>
                <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'space-between' }, mb: 4, flexWrap: 'wrap', textAlign: 'center' }}>
                    <Button sx={button} href='my-orders' >{transition[lang].al}</Button>
                    <Button sx={button} href='my-orders?state=new'>{transition[lang].n}</Button>
                    <Button sx={button} href='my-orders?state=in-progress'>{transition[lang].ip}</Button>
                    <Button sx={button} href='my-orders?state=delivery'>{transition[lang].od}</Button>
                    <Button sx={button} href='my-orders?state=completed'>{transition[lang].com}</Button>
                </Box>
                {cards}
            </Container>
        </ThemeProvider >
    );
};

const Card = (props) => {
    const transition = {
        ar: Arabic,
        en: English
    };
    let lang = localStorage.getItem('lang') !== null ? localStorage.getItem('lang') : 'en';
    const classes = useStyles();

    const { id, price, date, state } = props.order;

    return (
        <Box className={classes.container} sx={{ p: 6, mt: 2, mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant='h6' sx={{ fontWeight: '600' }}>{transition[lang].oi} : <span style={{ color: '#707070', fontWeight: '500' }}>{id}</span></Typography>
                <Typography variant='h5' color={state == 'New' ? '#db0e0e' : state == 'In Progress' ? '#567af1' : state == 'On Delivery' ? '#f29721' : '#1b9748'}>{state}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 5, flexWrap: 'wrap' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: { xs: '100%', sm: '70%', md: '45%' } }}>
                    <Box sx={{ display: 'flex' }}>
                        <AttachMoneyIcon color='primary' sx={{ mr: 1 }} fontSize='large' />
                        <Typography component='span' variant='h6' sx={{ fontWeight: '600' }} >{price}.00 KWD</Typography>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                        <CalendarTodayIcon color='primary' sx={{ mr: 2 }} fontSize='large' />
                        <Typography component='span' variant='h6' sx={{ fontWeight: '600' }} >{date}</Typography>
                    </Box>
                </Box>
                <IconButton href={`/${lang}/my-orders/${id}`} className={classes.card_btn} sx={{ mt: { xs: 4, sm: 0 }, ml: { xs: 'auto', sm: 0 }, mr: { xs: 'auto', sm: 0 } }}>
                    <ArrowForwardIcon fontSize='large' />
                </IconButton>
            </Box>

        </Box>
    );
};
export default MyOrders;