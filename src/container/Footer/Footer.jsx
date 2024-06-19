import React from "react";

import { images } from "../../constants";
import { AppWrap, MotionWrap } from "../../wrapper";
import { BsLinkedin } from "react-icons/bs";
import "./Footer.scss";

const Footer = () => {
  return (
    <>
      <h2 className="head-text">Take a ☕ & chat with me</h2>

      <div className="app__footer-cards">
        <div
          className="app__footer-card"
          style={{
            backgroundColor: "#bfdcf4",
          }}
        >
          {/* <img src={images.mobile} alt="phone" /> */}
          <BsLinkedin
            style={{
              color: "#0077b5",
              width: "40px",
              height: "40px",
              marginRight: "12px",
              marginLeft: "12px",
            }}
          />
          <a
            href="https://www.linkedin.com/in/rebecca-akparanta-9643a0233/"
            target="_blank"
            rel="noreferrer"
            className="p-text"
          >
            Linkedin
          </a>
        </div>
        <div className="app__footer-card ">
          <img src={images.email} alt="email" />
          <a href="mailto:chidozieezeanekwe@gmail.com" className="p-text">
            rebeccaakparanta@gmail.com
          </a>
        </div>
        <div className="app__footer-card">
          <img src={images.mobile} alt="phone" />

          <a href="https://wa.me/2349068904044" className="p-text">
            Whatsapp
          </a>
        </div>
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Footer, "app__footer"),
  "contact",
  "app__whitebg"
);
