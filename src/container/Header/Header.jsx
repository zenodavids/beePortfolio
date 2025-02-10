import React from "react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";

import { AppWrap } from "../../wrapper";

import { images } from "../../constants";
import "./Header.scss";
// import { FaSalesforce, FaLinkedin, FaHubspot } from "react-icons/fa";

const icons = [
  {
    imgSrc: images.clay,
    name: "clay",
  },
  {
    imgSrc: images.make,
    name: "make",
  },
  {
    imgSrc: images.instantly,
    name: "instantly",
  },
  // { component: <FaLinkedin color="#0A66C2" size="5em" />, name: "LinkedIn" },
  // { component: <FaHubspot color="#FF7A59" size="3em" />, name: "HubSpot" },
];

const scaleVariants = {
  whileInView: {
    scale: [0, 1],
    opacity: [0, 1],
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
};

const Header = () => (
  <div className="app__header app__flex">
    {/* name and greeting */}
    <motion.div
      whileInView={{ x: [-100, 0], opacity: [0, 1] }}
      transition={{ duration: 0.5 }}
      // animation for the name
      className="app__header-info"
    >
      <div className="app__header-badge">
        <div className="badge-cmp app__flex">
          <span style={{ fontSize: "2.5rem" }}>👋🏽</span>
          <div style={{ marginLeft: 20 }}>
            <p className="p-text">Hello, I'm</p>
            <h1 className="head-text">Rebecca</h1>
          </div>
        </div>

        <div className="tag-cmp app__flex">
          <p className="typewriter-text">
            <Typewriter
              className="typewriter-text"
              style={{ color: "white" }}
              options={{
                strings: [
                  "Go-To-Market Strategist",
                  "Sales Development Representative",
                  "Lead Generation Specialist",
                  "Outbound Prospecting Expert",
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </p>
        </div>
      </div>
    </motion.div>
    {/* my picture */}
    <motion.div
      whileInView={{ opacity: [0, 1] }}
      transition={{ duration: 0.5, delayChildren: 0.5 }}
      className="app__header-img"
    >
      <img src={images.profile} alt="profile_bg" />
      <motion.img
        whileInView={{ scale: [0, 1] }}
        transition={{ duration: 1, ease: "easeInOut" }}
        src={images.circle}
        alt="profile_circle"
        className="overlay_circle"
      />
    </motion.div>

    {/* floating bubbles behind me */}
    <motion.div
      variants={scaleVariants}
      whileInView={scaleVariants.whileInView}
      className="app__header-circles"
    >
      {icons.map((icon, index) => (
        <div className="circle-cmp app__flex" key={`icon-${index}`}>
          <img
            src={icon.imgSrc}
            alt={icon.name}
            style={{ width: "4em", height: "4em" }}
          />
        </div>
      ))}
    </motion.div>
  </div>
);

export default AppWrap(Header, "home");
// using the higher order component 'AppWrap', we pass in the Heder as the first argument, and the header's div id 'home' as the order argument
