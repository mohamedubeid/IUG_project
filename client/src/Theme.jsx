import { createTheme } from '@mui/material/styles';

const CustomTheme = createTheme({
    palette: {
        primary: {
            main: '#e9d5e8',
            contrastText: '#000',

        },
        secondary: {
            main: '#f4eccf',
            contrastText: '#000',
        },
        black_n: {
            main: '#000',
        },
        error: {
            main: '#DB0E0E'
        },
        success: {
            main: '#1b9748'
        }
    },
    typography: {
        "fontFamily": localStorage.getItem('lang') == 'en' ? `'Poppins', sans-serif` : `'Tajawal', sans-serif`,
    },

});

export default CustomTheme;

