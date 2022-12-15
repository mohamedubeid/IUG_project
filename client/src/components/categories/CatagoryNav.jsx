import React from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Link, Typography } from '@mui/material';
import CustomTheme from '../../Theme';
import { ThemeProvider } from '@mui/material/styles';

const CategoryNav = (props) => {
    const catagoryName = props.catagoryName;
    const productName = props.productName;
    let lang = localStorage.getItem('lang') !== null ? localStorage.getItem('lang') : 'en';

    return (
        <ThemeProvider theme={CustomTheme}>
            <Box
                sx={{
                    backgroundColor: 'var(--secondary)',
                    p: 3,
                    mb: 5,
                    boxShadow: '0px 3px 6px 0px #0000002e',
                    position: 'relative',
                    zIndex: 15
                }}
            >
                <Container>
                    {lang == 'en' ?
                        <Box>
                            <Link href={`/${lang}/catagories`} underline="hover" sx={{ color: 'black' }}>
                                CATAGORIES
                            </Link>
                            &nbsp; &gt;  &nbsp;
                            <Link href={`/${lang}/catagories/${props.catId}/${catagoryName}`} underline="hover" sx={{ color: 'black' }}>
                                {catagoryName ? catagoryName.toUpperCase() : ''}
                            </Link>
                            &nbsp; &gt; &nbsp;
                            {productName ? productName.toUpperCase() : ''}
                        </Box>
                        :
                        <Box>

                            {productName ? <Typography sx={{ display: 'inline' }}>
                                {productName}
                                &nbsp; &lt; &nbsp;</Typography> : ''}
                            <Link href={`/${lang}/catagories/${props.catId}/${catagoryName}`} underline="hover" sx={{ color: 'black' }}>
                                {catagoryName ? catagoryName : ''}
                            </Link>
                            <Link href={`/${lang}/catagories`} underline="hover" sx={{ color: 'black' }}>
                                &nbsp; &lt;  &nbsp;
                                التصنيفات
                            </Link>
                        </Box>
                    }
                </Container>
            </Box >
        </ThemeProvider>
    );
};

export default CategoryNav