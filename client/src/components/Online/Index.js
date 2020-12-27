import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SingleOnline from "./SingelOnline";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "30px",
    "& > *": {
      margin: "1px 0",
    },
  },
}));

export default function Index() {
  const classes = useStyles();
  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };
  return (
    <div className="m-30">
      <p>Online</p>
      <Slider {...settings} className={classes.root}>
        <SingleOnline url="http://lorempixel.com/400/200/" />
        <SingleOnline url="http://lorempixel.com/400/200/" />
        <SingleOnline url="http://lorempixel.com/400/200/" />
        <SingleOnline url="http://lorempixel.com/400/200/" />
        <SingleOnline url="http://lorempixel.com/400/200/" />
        <SingleOnline url="http://lorempixel.com/400/200/" />
        <SingleOnline url="http://lorempixel.com/400/200/" />
      </Slider>
    </div>
  );
}
