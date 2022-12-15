import React from 'react'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const Notification = (props) => {
    const vertical = 'top';
    const horizontal = 'center';
    return (
        <Snackbar open={props.open} autoHideDuration={2000} onClose={props.handleClose} anchorOrigin={{ vertical, horizontal }}>
            <Alert onClose={props.handleClose} severity={props.severity}  sx={{ width: '100%' }}>
                {props.text}
            </Alert>
        </Snackbar>
    )
}

export default Notification;