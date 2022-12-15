import React from 'react'
import Typography from '@mui/material/Typography';

const FormError = (props) => {
    return <Typography component='span' sx={{ color: 'var(--error)', fontSize: '10px', mt: 2, display: 'block', ml: -1 }}>
        {props.text}
    </Typography>
}

export default FormError;

/*

const LoginError = (props) => {
    return <Typography component='span' sx={{ color: 'var(--error)', fontSize: '10px', mt: 2, display: 'block', ml: -1 }}>
        {props.text}
    </Typography>
};

*/