import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Box from '@mui/material/Box';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import Button from '@mui/material/Button';
import useStyles from '../../MakeStyles';



const rightArrow1 = {
    color: '#000',
    position: 'absolute',
    right: { xs: '-3%', md: '0%' },
    top: { xs: '34%' },
    border: 'none',
    cursor: 'pointer',
    textAlign: 'center',
    padding: { xs: '6px 0px 5px 0px', md: '13px 0px 12px 0px' },
}

const leftArrow1 = {
    color: '#000',
    position: 'absolute',
    padding: { xs: '6px 0px 5px 0px', md: '13px 0px 12px 0px' },
    left: { xs: '-7%', md: '0%' },
    bottom: { xs: '35%', md: '34%' },
    border: 'none',
    cursor: 'pointer',
    transform: 'rotate(180deg)',
    textAlign: 'center',
}

const rightArrow2 = {
    color: '#000',
    position: 'absolute',
    right: { xs: '1%', md: '1%' },
    bottom: { xs: '50%', md: '50%' },
    border: 'none',
    cursor: 'pointer',
    textAlign: 'center',
    padding: { xs: '6px 0px 5px 0px', md: '13px 0px 12px 0px' },

}

const leftArrow2 = {
    color: '#000',
    position: 'absolute',
    padding: { xs: '6px 0px 5px 0px', md: '13px 0px 12px 0px' },
    left: { xs: '-7%', md: '0%' },
    bottom: { xs: '50%', md: '50%' },
    border: 'none',
    cursor: 'pointer',
    transform: 'rotate(180deg)',
    textAlign: 'center',
}

const CardCarousel = (props) => {
    const cards = props.cards;
    const products = props.products;
    const responsive1 = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1024 },
            items: 5,
        },
        desktop: {
            breakpoint: { max: 1024, min: 900 },
            items: 4,

        },
        tablet: {
            breakpoint: { max: 900, min: 650 },
            items: 3
        },
        mobile: {
            breakpoint: { max: 650, min: 0 },
            items: 2
        }
    };
    const responsive2 = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1024 },
            items: 3,
        },
        desktop: {
            breakpoint: { max: 1024, min: 900 },
            items: 2,

        },
        tablet: {
            breakpoint: { max: 900, min: 650 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 650, min: 0 },
            items: 1
        }
    };
    return <Box sx={{ position: 'relative', marginLeft: '35px' }}>
        <Carousel responsive={products ? responsive2 : responsive1}
            renderArrowsWhenDisabled={true}
            draggable={false}
            customRightArrow={<CustomRightArrow products={products} />}
            customLeftArrow={<CustomLeftArrow products={products} />}
            containerClass="carousel-container"
            itemClass="carousel-item"
        >
            {cards}
        </Carousel>
    </Box>;
};

const CustomRightArrow = ({ products, onClick, ...rest }) => {
    const classes = useStyles();

    return <Button onClick={() => onClick()}
        className={classes.container}
        sx={products ? rightArrow2 : rightArrow1}
    >
        <ArrowForwardIosOutlinedIcon />
    </Button>;
};

const CustomLeftArrow = ({ products, onClick, ...rest }) => {
    const classes = useStyles();

    return (
        <Button onClick={() => onClick()}
            className={classes.container}
            sx={products ? leftArrow2 : leftArrow1}

        >
            <ArrowForwardIosOutlinedIcon />
        </Button>

    );
};

export default CardCarousel;