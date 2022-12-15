import { createStyles, makeStyles } from '@mui/styles';



const useStyles = makeStyles((theme) =>

    createStyles({
        card_btn: {
            backgroundColor: 'var(--secondary)',
            color: '#000',
            padding: '10px 20px',
            borderRadius: '10px',
            webkitBoxShadow: '0px 3px 6px 0px #0000002e',
            boxShadow: '0px 3px 6px 0px #0000002e',
            fontSize: '12px',
            fontWeight: '500',
            textTransform: 'capitalize',
            '&:hover': {
                backgroundColor: 'var(--primary)',
            }
        },
        contact_fields: {
            padding: '15px',
            height: '78px',
            outline: 'none',
            border: 'none',
            backgroundColor: '#fff',
            boxShadow: '0px 3px 6px 0px #0000002e',
            borderRadius: '17px',
            fontSize: '20px',
            "& .MuiFormLabel-root": {
                paddingLeft: '15px',
                paddingTop: '5px',
                color: '#ccd',
                fontSize: '17px',
                fontWeight: '200'
            }
        },
        footer_fields: {
            padding: '5px',
            outline: 'none',
            border: 'none',
            backgroundColor: '#fff',
            boxShadow: '0px 3px 8px 0px #0000002e',
            borderRadius: '15px',
            fontSize: '20px',
            "& .MuiFormLabel-root": {
                paddingLeft: '15px',
                color: '#aaa',
                fontSize: '18px'

            }
        },
        btn: {
            backgroundColor: 'var(--secondary)',
            color: '#000',
            borderRadius: '17px',
            webkitBoxShadow: '0px 5px 10px -5px #0000002e',
            boxShadow: '0px 5px 10px 0px #0000002e',
            fontSize: '22px',
            fontWeight: '400',
            textTransform: 'capitalize',
            '&:hover': {
                backgroundColor: 'var(--primary)',
            }
        },
        container: {
            boxShadow: '0px 3px 8px 0px #0000002e',
            backgroundColor: '#fff',
            borderRadius: '15px',
        },
        helperText: {
            color: '#DB0E0E',
            marginTop:25,
        }
    }),
);

export default useStyles;