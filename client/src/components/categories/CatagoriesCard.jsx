import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useStyles from '../../MakeStyles';
import CustomTheme from '../../Theme';
import { ThemeProvider } from '@mui/material/styles';



const CatagoriesCard = ({ name, icon }) => {
    const classes = useStyles();

    return (
        <ThemeProvider theme={CustomTheme}>
            <Box
                className={classes.container}
                sx={{
                    height: '130px',
                    width: '130px',
                    m: '10px 0px 10px 6px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    '&:hover': {
                        backgroundColor: 'var(--primary)'
                    }
                }}
                onClick={() => console.log("do somthing")}
            >
                <img src={`/images/${icon}.png`} alt={`${name}`} style={{ width: '70px' }} />
                <Typography sx={{ mt: 1 }}>{name}</Typography>
            </Box>
        </ThemeProvider>
    );
};

export default CatagoriesCard;