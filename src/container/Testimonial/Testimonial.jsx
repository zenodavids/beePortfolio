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
  // {
  //   company: "CozyHome Mart",
  //   feedbackImg: "/reveiws/24.png",
  // },
];

const dummyBrands = [
  {
    name: "Brand A",
    imgUrl: "/brands/amazon.png",
  },
  {
    name: "Brand B",
    imgUrl: "/brands/asus.png",
  },
  {
    name: "Brand C",
    imgUrl: "/brands/bolt.png",
  },
  {
    name: "Brand C",
    imgUrl: "/brands/nb.png",
  },
  {
    name: "Brand C",
    imgUrl: "/brands/spotify.png",
  },
];

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  const [brands, setBrands] = useState([]);

  const handleClick = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    // Setting dummy data directly
    setTestimonials(dummyTestimonials);
    setBrands(dummyBrands);
  }, []);

  return (
    <>
      {testimonials.length && (
        <>
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
