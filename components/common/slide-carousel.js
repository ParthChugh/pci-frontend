import React from "react";
import { Paper, Typography } from '@mui/material'
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
      maxHeight: 30,
      borderRadius: "24px"
    }
  },
  car: {
    width: "75%",
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
      width: 35,
      height: 8,
      transition: "width 0.3s ease-in-out",
      backgroundColor: "#FFCF00",
      borderRadius: "5px"
    },

    "& .slick-dots .slick-active .ft-slick__dots--custom": {
      width: 35,
      top: "0px",
      height: 8,
      overflow: "hidden"
    }
  }
}));

export default function SlideCarousel(props) {
  const classes = useStyles();
  const onboardingCarosuelConfig = props.CAROUSEL;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    appendDots: dots => <ul className={classes.dots}> {dots} </ul>
  };

  const ImageList = (onboardingCarosuelConfig["item"]||[]).map(item => {
    return { ...item, height: 20, width: 20 };
  });
  
  return (
    <Slider {...settings} className={classes.car}>
      {ImageList.map((item, i) => (
        <Paper elevation={0} key={i} className={classes?.carouselItem}>
          <div
            style={{
              width: "100%",
              height: "40vh",
              position: "relative"
            }}
          >
            <Image src={item?.image_url} alt="login" layout="fill" objectFit="contain" />
          </div>
          <div className="p-2">
            {item?.title && (
              <Typography variant="h5" className="zmt-30">
                {item.title}
              </Typography>
            )}
            {item?.sub_title && (
              <Typography variant="body2" className="zmb-10 mt-2">
                {item.sub_title}
              </Typography>
            )}
          </div>
        </Paper>
      ))}
    </Slider>
  );
}
