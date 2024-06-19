<!-- install dependencies into the frontend_react directory -->

npm install @sanity/client @sanity/image-url framer-motion node-sass react-icons

<!-- container folder are containers, containing multiple components inside themselves -->

generate a component to include, the component screen width will be divided into two in large screen sizes and one on top of the other in small screen sizes;

- first half by the left will be a slider that will show review screenshots i got from my upwork, it will be minimal and slides by itself. just below it will bea pause icon so that onclick, it pauses and changs to play icon and vice versa.
- the second half will be a youtube video about my services will also have control buttons.

- the designs will be minimal and blend with the other components.

style it with scss

"/reveiws/24.png",
"/reveiws/25.png",
"/reveiws/26.png",
"/reveiws/27.png",

    import React, { useState, useEffect } from "react";

import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { motion } from "framer-motion";
import { AppWrap, MotionWrap } from "../../wrapper";
import "./ReviewSlider.scss";

const ReviewSlider = () => {
const [isPlaying, setIsPlaying] = useState(true);
const [currentSlide, setCurrentSlide] = useState(0);
const reviews = [
"/reveiws/24.png",
"/reveiws/25.png",
"/reveiws/26.png",
"/reveiws/27.png",
];

useEffect(() => {
let slideInterval;
if (isPlaying) {
slideInterval = setInterval(() => {
setCurrentSlide((prevSlide) => (prevSlide + 1) % reviews.length);
}, 3000);
}
return () => clearInterval(slideInterval);
}, [isPlaying, reviews.length]);

const togglePlayPause = () => {
setIsPlaying(!isPlaying);
};

return (
<div className="container">
<h2 className="head-text">
Client Reviews & <span>Service Overview</span>
</h2>
<div className="review-slider">
<div className="review-slider__left">
<div className="review-slider__slides">
{reviews.map((review, index) => (
<div
key={index}
className="review-slider**slide"
style={{
                  transform: `translateX(${-currentSlide * 100}%)`,
                }} >
<img src={review} alt={`Review ${index + 1}`} />
</div>
))}
</div>
<div className="review-slider**control" onClick={togglePlayPause}>
{isPlaying ? <AiFillPauseCircle /> : <AiFillPlayCircle />}
</div>
</div>
<div className="review-slider__right">
<iframe
className="review-slider\_\_video"
width="100%"
height="315"
src={`https://www.youtube.com/embed/FhUDtlaHOYY`}
title="YouTube video"
frameBorder="0"
allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
allowFullScreen ></iframe>
</div>
</div>
</div>
);
};

export default AppWrap(
MotionWrap(ReviewSlider, "app**review-slider"),
"review-slider",
"app**whitebg"
);
