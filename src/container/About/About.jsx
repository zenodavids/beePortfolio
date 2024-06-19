import React from "react";
import { motion } from "framer-motion";

import { AppWrap, MotionWrap } from "../../wrapper";
import "./About.scss";

const About = () => {
  return (
    <>
      <div className="review-slider">
        <div className="review-slider__left">
          <h2 className="head-text">
            I know that <span>Good Sales </span> <br />
            means{" "}
            <span>
              Good Business. <br />{" "}
            </span>{" "}
          </h2>
        </div>
        <motion.div
          whileInView={{ opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5, type: "tween" }}
          className="app__profile-item"
        >
          <div className="review-slider__right">
            <iframe
              className="review-slider__video"
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/FhUDtlaHOYY`}
              title="YouTube video"
              frameBorder="0"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(About, "app__about"),
  "about",
  "app__whitebg"
);
