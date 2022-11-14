import React from "react";
import { Paper, Typography, useMediaQuery } from '@mui/material'
import { makeStyles } from '@mui/styles';
import Image from "next/image";
import Slider from "react-slick";

const useStyles = makeStyles(() => ({
  carouselItem: {
    backgroundColor: "transparent",
    width: "100%",
    position: "relative",
    textAlign: "center",
    "& img": {
      height: 100,
      borderRadius: "24px"
    }
  },
  car: {
    width: "100%",
    "& .next_prev": {
      bottom: "50%",
      zIndex: 1,
      visibility: "hidden",
      "&.prev": {
        left: 0
      }
    },
    "&:hover": {
      "& .next_prev": {
        visibility: "visible"
      }
    },
    "& .slick-dots li button:before": {
      content: "''",
      width: 8,
      height: 8,
      backgroundColor: "#FFCF00",
      borderRadius: "50%"
    },
    "& .slick-dots li": {
      width: 8,
      margin: "0 4px",
      transition: "width 0.3s ease-in-out"
    },

    "& .slick-dots .slick-active": {
      // width: 35,
      height: 8,
      transition: "width 0.3s ease-in-out",
      backgroundColor: "#FFCF00",
      borderRadius: "5px"
    },

    "& .slick-dots .slick-active .ft-slick__dots--custom": {
      // width: 35,
      top: "0px",
      height: 8,
      overflow: "hidden"
    },
    "& .slick-dots": {
      bottom: "30px"  // play with the number of pixels to position it as you want
    }
  },
}));

export default function SlideCarousel(props) {
  const classes = useStyles();
  const {height = "30rem", fit = "cover"} = props;
  const onboardingCarosuelConfig = props.CAROUSEL;
  const matches = useMediaQuery('(min-width:600px)')

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    appendDots: dots => <ul className={classes.dots}> {dots} </ul>
  };

  const ImageList = (onboardingCarosuelConfig||[]).map(item => {
    return { ...item, height: 30, width: 60 };
  });
  
  return (
    <Slider {...settings} className={classes.car}>
      {ImageList.map((item, i) => (
        <Paper elevation={0} key={i} className={classes?.carouselItem}>
          <div
            style={{
              width: "100%",
              height: matches ? height : "15rem",
              objectFit: "contain",
              position: "relative",
              // ...matches ? {
              //   height: "30rem"
              // } : {
              //   height: "15rem"
              // }
            }}
          >
            <Image src={item?.url} alt="login" layout="fill" objectFit={matches ? fit : "cover"} priority />
          </div>
          <div className="p-2">
            {/* {item?.title && (
              <Typography variant="h5" className="zmt-30">
                fasfassfasf
              </Typography>
            )}
            {item?.sub_title && (
              <Typography variant="body2" className="zmb-10 mt-2">
                dwadwa
              </Typography>
            )} */}
          </div>
        </Paper>
      ))}
    </Slider>
  );
}
