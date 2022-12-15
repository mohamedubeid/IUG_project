import { Box } from '@mui/material';
import React from 'react'
import SimpleImageSlider from "react-simple-image-slider";

const ImageSlider = () => {
    const images = [
        { url: '/images/smiley-woman-posing-while-holding-shopping-bags-with-copy-space.png' },
        { url: '/images/smiley-woman-posing-while-holding-shopping-bags-with-copy-space.png' },
        { url: '/images/smiley-woman-posing-while-holding-shopping-bags-with-copy-space.png' },
        { url: '/images/smiley-woman-posing-while-holding-shopping-bags-with-copy-space.png' },
        { url: '/images/smiley-woman-posing-while-holding-shopping-bags-with-copy-space.png' },

    ]
    return (
        <Box >
            <SimpleImageSlider
                width={'100%'}
                height={'563.6px'}
                images={images}
                showBullets={true}
                showNavs={false}
                slideDuration={3.5}
                loop
                autoPlay
            />
        </Box>
    );
};

export default ImageSlider;