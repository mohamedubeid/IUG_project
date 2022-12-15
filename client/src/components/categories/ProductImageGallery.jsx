import React from 'react'
import ImageGallery from 'react-image-gallery';
import '../../App.css';
import Box from '@mui/material/Box';
import useStyles from '../../MakeStyles';

const ProductImageGallery = (props) => {
    const classes = useStyles();
    const images = props.images;
    return (
        <Box
            className={classes.container}
            sx={{
                width: '100%',
                paddingTop: 3,
                paddingBottom: 3,
                paddingLeft: '4px',
                paddingRight: '4px',
            }}>
            <ImageGallery
                items={images}
                infinite={false}
                showNav={false}
                showFullscreenButton={false}
                useBrowserFullscreen={false}
                useTranslate3D={false}
                showPlayButton={false}
                disableKeyDown={true}
            />
        </Box>
    )
}

export default ProductImageGallery;