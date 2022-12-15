import React from 'react';
import Typography from '@mui/material/Typography';
import useStyles from '../../MakeStyles';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import Radio from '@mui/material/Radio';
import Arabic from '../../Arabic';
import English from '../../English';
import { useNavigate } from 'react-router-dom';

const address = {
    fontSize: '18px',
    color: '#6b6666',
    p: 1
};

const iconsStyle = {
    position: 'absolute',
    top: 10,
    right: 10,
    color: '#000'
}

const AddressCard = (props) => {
    const transition = {
        ar: Arabic,
        en: English
    };
    console.log(props.address,'*********')
    let lang = localStorage.getItem('lang') !== null ? localStorage.getItem('lang') : 'en';
    const navigate = useNavigate();
    const classes = useStyles();
    const enableDelete = props.enableDelete;
    const enableEdit = props.enableEdit;
    const { id, city, area, street, house, isDefault } = props.address;
    const selectAddress = props.selectAddress;
    return (
        <Box
            className={classes.container}
            sx={{
                p: 5,
                pt: 7,
                position: 'relative'
                , ...(lang == 'ar' && { 'direction': 'rtl' })
            }}>
            <Typography gutterBottom sx={{ fontSize: '20px', p: 1 }}>{transition[lang].da}{isDefault == 1 ? <span style={{ color: '#6b6666' }}>({transition[lang].de})</span> : null} </Typography>
            <Typography gutterBottom sx={address}>{transition[lang].city} : {city}</Typography>
            <Typography gutterBottom sx={address}>{transition[lang].ari} : {area}</Typography>
            <Typography gutterBottom sx={address}>{transition[lang].st} : {street}</Typography>
            <Typography gutterBottom sx={address}>{transition[lang].ho} : {house}</Typography>
            {selectAddress ?
                <Radio
                    checked={props.selectedValue}
                    onChange={props.handleChange}
                    value={id}
                    name="radio-buttons"
                    sx={iconsStyle}
                />
                :
                enableEdit && !selectAddress ?
                    < IconButton sx={{
                        position: 'absolute',
                        top: 15,
                        right: 60,
                        color: '#000',
                        mr:
                            enableDelete ? 0
                                : -5
                    }}
                        onClick={
                            enableDelete ?
                                () => navigate(`/${lang}/edit-address`, {
                                    state: {
                                        address: props.address
                                    }
                                })
                                :
                                localStorage.getItem('accessToken') ?
                                    () => navigate(`/${lang}/select-my-address`, { replace: false, state: { id: id } })
                                    :
                                    () => navigate(`/${lang}/add-new-address`, { replace: false, state: { id: id } })
                        }
                    ><EditIcon fontSize='medium' /></IconButton>
                    :
                    null
            }
            {
                enableDelete && !selectAddress ? <IconButton sx={iconsStyle} onClick={() => {
                    props.deleteAddress(id);
                }}><CloseIcon fontSize='large' /></IconButton>
                    :
                    null
            }
        </Box >
    );
};

export default AddressCard;
