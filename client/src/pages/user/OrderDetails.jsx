import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import React from 'react';
import CustomTheme from '../../Theme';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import useStyles from '../../MakeStyles';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import AddressCard from '../../components/client/AddressCard';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import Arabic from '../../Arabic';
import English from '../../English';


/*

    const userToken = localStorage.getItem('accessToken');


   if (userToken) {
            navigate('/', { replace: true });
        }

useMemo


        window.scrollTo(0, 0);
*/


const summaryPrice = {
    display: 'flex',
    justifyContent: 'space-between',
    pt: 1,
    pb: 1,
}



const OrderDetails = (props) => {
    const classes = useStyles();

    const transition = {
        ar: Arabic,
        en: English
    };
    const { orderId } = useParams();
    const order = {
        id: '22018452',
        price: 165,
        date: '03/12/2021',
        state: 'New'
    }

    const shop = [
        {
            img: '/images/A Cute Business Casual Outfit _ Cella Jane.png',
            name: 'Nike Shoes',
            price: 50,
            count: '2',
        },
        {
            img: '/images/Devoluciones Gratis ✓ Envíos Gratis en Pedidos +$49 ✓_Top con ribete con volantes con lazo delantero - grande- Blusas Extra Grandes en SHEIN_.png',
            name: 'Nike Shoes',
            price: 50,
            count: '2',
        },
        {
            img: '/images/GentWith Akron Slim Fit Short Sleeve Shirt - White.png',
            name: 'Nike Shoes',
            price: 50,
            count: '2',
        },
        {
            img: '/images/Devoluciones Gratis ✓ Envíos Gratis en Pedidos +$49 ✓_Top con ribete con volantes con lazo delantero - grande- Blusas Extra Grandes en SHEIN_.png',
            name: 'Nike Shoes',
            price: 50,
            count: '2',
        },
        {
            img: '/images/Spring.png',
            name: 'Nike Shoes',
            price: 50,
            count: '2',
        },
        {
            img: '/images/Devoluciones Gratis ✓ Envíos Gratis en Pedidos +$49 ✓_Top con ribete con volantes con lazo delantero - grande- Blusas Extra Grandes en SHEIN_.png',
            name: 'Nike Shoes',
            price: 50,
            count: '2',
        },
        {
            img: '/images/Spring.png',
            name: 'Nike Shoes',
            price: 50,
            count: '2',
        }


    ];

    var subPrice = 0;
    shop.map((sh) =>
        subPrice += sh.price
    );

    const orders = shop.map((order, index) => <Item img={order.img} name={order.name} price={order.price} count={order.count} key={index} />)

    const shippingAddress = {
        isDefault: true,
        area: 'Gaza',
        street: 'Aldhdouh Street',
        house: 'Next to Omar Ibn Al-Khatab Mosque'
    };

    let lang = localStorage.getItem('lang') !== null ? localStorage.getItem('lang') : 'en';
    return (
        <ThemeProvider theme={CustomTheme}>
            <Container sx={{ mt: 15, mb: 20 }}>
                <Typography gutterBottom variant='h4' color='#000' sx={{ ...(lang == 'ar' && { 'direction': 'rtl' }) }}>{transition[lang].ord}</Typography>

                <Box className={classes.container} sx={{ p: 6, mt: 6, mb: 2, ...(lang == 'ar' && { 'direction': 'rtl' }) }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant='h6' sx={{ fontWeight: '600' }}>{transition[lang].oi}: <span style={{ color: '#707070', fontWeight: '500' }}>{order.id}</span></Typography>
                        <Typography variant='h5' color={order.state == 'New' ? '#db0e0e' : order.state == 'In Progress' ? '#567af1' : order.state == 'On Delivery' ? '#f29721' : '#1b9748'}>{order.state}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 5, flexWrap: 'wrap' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: { xs: '100%', sm: '70%', md: '45%' } }}>
                            <Box sx={{ display: 'flex' }}>
                                <AttachMoneyIcon color='primary' sx={{ mr: 1 }} fontSize='large' />
                                <Typography component='span' variant='h6' sx={{ fontWeight: '600' }} >{order.price}.00 {transition[lang].kwd}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex' }}>
                                <CalendarTodayIcon color='primary' sx={{ mr: 2 }} fontSize='large' />
                                <Typography component='span' variant='h6' sx={{ fontWeight: '600' }} >{order.date}</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>

                <Grid container className={classes.container} sx={{ p: 6, mt: 3, ...(lang == 'ar' && { 'direction': 'rtl' }) }} justifyContent='space-between'>
                    <Grid item xs={12} md={5} sx={{
                        height: '446px',
                        overflow: 'scroll',
                        mt: 1,
                        mr: 'auto',
                        ml: 'auto',
                        overflowX: 'hidden',
                        '&::-webkit-scrollbar-thumb': {
                            width: '1px',
                            borderRadius: '13px',
                            backgroundClip: 'padding-box',
                            border: '10px solid transparent',
                            boxShadow: 'inset 0 0 0 10px',
                            background: 'var(--secondary)',

                        },
                        '&::-webkit-scrollbar': {
                            marginLeft: '200px',
                            width: '6px',
                            borderRadius: '13px',
                            backgroundClip: 'padding-box',
                            border: '10px solid transparent',
                        }
                    }}>
                        {orders}
                    </Grid>
                    <Grid item xs={12} sm={10} md={7} lg={6} sx={{ p: { xs: 0, md: 6 }, mr: 'auto', ml: 'auto', ...(lang == 'ar' && { 'direction': 'rtl' }) }} >
                        <Box className={classes.container} sx={{ padding: '80px 60px' }}>
                            <Box sx={summaryPrice}>
                                <Typography variant='h6'>{transition[lang].spr}</Typography>
                                <Typography variant='h6'>{subPrice}.00 {transition[lang].kwd}</Typography>
                            </Box>
                            <Box sx={summaryPrice}>
                                <Typography variant='h6'>{transition[lang].si}</Typography>
                                <Typography variant='h6'>150.00 {transition[lang].kwd}</Typography>
                            </Box>
                            <Box sx={summaryPrice}>
                                <Typography variant='h6'>{transition[lang].kwd}</Typography>
                                <Typography variant='h6'>150.00 {transition[lang].kwd}</Typography>
                            </Box>
                            <hr style={{ color: '#bbb', margin: '25px 0px 25px 0px', borderTop: '1px dashed  ' }} />
                            <Box sx={summaryPrice}>
                                <Typography variant='h6'>{transition[lang].tp}</Typography>
                                <Typography variant='h6'>150.00 {transition[lang].kwd}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>

                <Box sx={{ display: 'flex', mt: 4, justifyContent: 'space-between', flexDirection: { xs: 'column', lg: 'row' }, ...(lang == 'ar' && { 'direction': 'rtl' }) }}>
                    <AddressCard address={shippingAddress} enableDelete={false} enableEdit={false} />
                    <Box className={classes.container} sx={{ p: 6, mt: { xs: 4, lg: 0 } }}>
                        <Box sx={{ display: 'flex', mt: 4, mb: 4 }}>
                            <CalendarTodayIcon color='primary' fontSize='large' sx={{ mr: 3 }} />
                            <Typography variant='h5' >{transition[lang].dor} : <span style={{ color: '#979797', fontWeight: '400', fontSize: '20px', marginLeft: '30px' }}> 10/1/2022</span></Typography>
                        </Box>
                        <Box sx={{ display: 'flex', mt: 4, mb: 4 }}>
                            <AccessTimeFilledIcon color='primary' fontSize='large' sx={{ mr: 3 }} />
                            <Typography variant='h5' >{transition[lang].tor} : <span style={{ color: '#979797', fontWeight: '400', fontSize: '20px', marginLeft: '30px' }}> 10:00 - 12:00 AM</span></Typography>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider >
    );
};

const Item = (props) => {
    const transition = {
        ar: Arabic,
        en: English
    };
    let lang = localStorage.getItem('lang') !== null ? localStorage.getItem('lang') : 'en';
    return (
        <Grid container sx={{ mt: 1, mb: 1 }} justifyContent='space-between' >
            <Grid item xs={4}  >
                <Box sx={{ width: '148px', height: '138px' }}>
                    <img src={props.img} style={{ width: '100%', height: '138px' }} alt='product' />
                </Box>
            </Grid>
            <Grid item xs={6} sx={{ marginTop: 'auto', marginBottom: 'auto' }}>
                <Typography gutterBottom color='primary'>{props.name}</Typography>
                <Typography >{props.price}.00 {transition[lang].kwd} </Typography>
            </Grid>
        </Grid>
    )
}
export default OrderDetails;