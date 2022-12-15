import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Arabic from '../../Arabic';
import English from '../../English';

const HelperText = (props) => {
    const transition = {
        ar: Arabic,
        en: English
    };
    let lang = localStorage.getItem('lang') !== null ? localStorage.getItem('lang') : 'en';
    return (
        //style={}, icon, text, iconFontSize textFontSize   
        <Box component='span' sx={props.style}>
            {props.icon ?
                <props.icon sx={{ fontSize: props.iconFontSize ? props.iconFontSize : '26px' }} />
                :
                null
            }
            <Typography
                component='span'
                sx={{
                    fontSize: props.textFontSize ? props.textFontSize : '16px',
                    ml: 1.5,
                    marginTop: 'auto',
                    marginBottom: 'auto'
                }}>
                {transition[lang][props.text]}
            </Typography>
        </Box>
    );
};

export default HelperText;