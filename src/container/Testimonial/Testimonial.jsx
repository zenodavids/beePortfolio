import React, { useState, useEffect } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { motion } from "framer-motion";

import { AppWrap, MotionWrap } from "../../wrapper";
import "./Testimonial.scss";

// Dummy data for testimonials and brands
const dummyTestimonials = [
  {
    company: "GLEAC",
    feedbackImg: "/reveiws/27.png",
  },
  {
    company: "Selling to Executives",
    feedbackImg: "/reveiws/24.png",
  },
  {
    company: "5T Media and Design",
    feedbackImg: "/reveiws/25.png",
  },
  {
    company: "Avani Media",
    feedbackImg: "/reveiws/26.png",
  },
  {
    company: "MapleDwell",
    feedbackImg: "/reveiws/27.png",
  },
];

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState([]);

  const handleClick = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    // Setting dummy data directly
    setTestimonials(dummyTestimonials);
  }, []);

  useEffect(() => {
    const autoSlide = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 3000); // Auto-slide every 3 seconds

    return () => clearInterval(autoSlide);
  }, [testimonials.length]);

  return (
    <>
      {testimonials.length && (
        <>
          {" "}
          <h2 className="head-text">
            Hear From <span>Those I've Worked With</span>
          </h2>
          <div className="app__testimonial-item app__flex">
            <div className="app__testimonial-content">
              <img
                className="p-text"
                src={testimonials[currentIndex].feedbackImg}
                alt={testimonials[currentIndex].company}
              />
              <div>
                <h4 className="bold-text">{testimonials[currentIndex].name}</h4>
                <h5 className="p-text">{testimonials[currentIndex].company}</h5>
              </div>
            </div>
          </div>
          <div className="app__testimonial-btns app__flex">
            <div
              className="app__flex"
              onClick={() =>
                handleClick(
                  currentIndex === 0
                    ? testimonials.length - 1
                    : currentIndex - 1
                )
              }
            >
              <HiChevronLeft />
            </div>

            <div
              className="app__flex"
              onClick={() =>
                handleClick(
                  currentIndex === testimonials.length - 1
                    ? 0
                    : currentIndex + 1
                )
              }
            >
              <HiChevronRight />
            </div>
          </div>
        </>
      )}

      {/* <div className="app__testimonial-brands app__flex">
        {brands.map((brand) => (
          <motion.div
            whileInView={{ opacity: [0, 1] }}
            transition={{ duration: 0.5, type: "tween" }}
            key={brand.name}
          >
            <img src={brand.imgUrl} alt={brand.name} />
          </motion.div>
        ))}
      </div> */}
    </>
  );
};

export default AppWrap(
  MotionWrap(Testimonial, "app__testimonial"),
  "testimonial",
  "app__primarybg"
);
