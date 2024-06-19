import React, { useState, useEffect } from "react";
import { AiFillEye } from "react-icons/ai";
import { motion } from "framer-motion";

import { AppWrap, MotionWrap } from "../../wrapper";
import "./Cert.scss";

// Dummy data
const dummyData = [
  {
    title: "HubSpot Academy",
    description: "HubSpot Marketing Software",
    tags: ["Email Marketing"],
    imgUrl: "/certificates/hubspot.png",
    certificateLink:
      "https://app.hubspot.com/academy/achievements/f19ys75c/en/1/rebecca-akparanta/hubspot%20marketing-software",
  },

  {
    title: "SV Academy",
    description: "Salesforce Sales Development Representative Specialization",
    tags: ["SDR / BDR"],
    imgUrl: "/certificates/sv.png",
    certificateLink:
      "https://www.coursera.org/account/accomplishments/specialization/G38V8AWLSLE8",
  },
  {
    title: "IBM",
    description: "Generative AI Fundamentals Specialization",
    tags: ["Generative AI"],
    imgUrl: "/certificates/ibm.png",
    certificateLink:
      "https://www.coursera.org/account/accomplishments/specialization/3KKNPXPLNJWL",
  },
  {
    title: "Salesforce",
    description: "Conversational Selling Playbook for SDRs",
    tags: ["SDR / BDR"],
    imgUrl: "/certificates/salesforce1.png",
    certificateLink:
      "https://www.coursera.org/account/accomplishments/certificate/6WYB2X6X2CFC",
  },

  {
    title: "Google",
    description: "Assess for Success: Marketing Analytics and Measurement",
    tags: ["Marketing Analytics"],
    imgUrl: "/certificates/mana.png",
    certificateLink:
      "https://www.coursera.org/account/accomplishments/certificate/3A7D9H6YXJMJ",
  },
  {
    title: "Google",
    description: "Think Outside the Inbox: Email Marketing",
    tags: ["Email Marketing"],
    imgUrl: "/certificates/emark.png",
    certificateLink:
      "https://www.coursera.org/account/accomplishments/certificate/L7HJ5LJMHY37",
  },
  {
    title: "Coursera",
    description: "Custom Reports in Google Analytics",
    tags: ["Google Analytics"],
    imgUrl: "/certificates/coursera.png",
    certificateLink:
      "https://www.coursera.org/account/accomplishments/certificate/U3UPRTHD4AH6",
  },
  {
    title: "University of California, Davis",
    description: "Google SEO Fundamentals",
    tags: ["SEO"],
    imgUrl: "/certificates/seo.png",
    certificateLink:
      "https://www.coursera.org/account/accomplishments/verify/XH66X7G7HNMM",
  },
  {
    title: "Meta (Facebook)",
    description: "Meta Social Media Marketing",
    tags: ["Social Media Marketing"],
    imgUrl: "/certificates/meta.png",
    certificateLink:
      "https://www.coursera.org/account/accomplishments/specialization/certificate/7QHEZED47BR5",
  },
  {
    title: "Coursera",
    description: "Search Engine Optimization (SEO) with Squarespace",
    tags: ["SEO"],
    imgUrl: "/certificates/squarespace.png",
    certificateLink:
      "https://www.coursera.org/account/accomplishments/certificate/HKV24BUYJJ4S",
  },
  {
    title: "Google",
    description: "Google Digital Marketing & E-commerce",
    tags: ["Digital Marketing", "E-commerce"],
    imgUrl: "/certificates/eco.png",
    certificateLink:
      "https://www.coursera.org/account/accomplishments/professional-cert/4A3BX3DN2ZZ6",
  },
];

const Cert = () => {
  const [certs, setCerts] = useState([]);
  const [filterCert, setFilterCert] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });

  useEffect(() => {
    // Setting dummy data directly
    setCerts(dummyData);
    setFilterCert(dummyData);
  }, []);

  const handleCertFilter = (item) => {
    setActiveFilter(item);
    setAnimateCard([{ y: 100, opacity: 0 }]);

    setTimeout(() => {
      setAnimateCard([{ y: 0, opacity: 1 }]);

      if (item === "All") {
        setFilterCert(certs);
      } else {
        setFilterCert(certs.filter((work) => work.tags.includes(item)));
      }
    }, 500);
  };

  return (
    <>
      <h2 className="head-text">
        Here's why I'm the <br />
        <span>Most Certified </span>
        for the Job.
      </h2>

      <div className="app__work-filter">
        {[
          "Digital Marketing",
          "Generative AI",
          "SDR / BDR",
          "Email Marketing",
          "SEO",
          "All",
        ].map((item, index) => (
          <div
            key={index}
            onClick={() => handleCertFilter(item)}
            className={`app__work-filter-item app__flex p-text ${
              activeFilter === item ? "item-active" : ""
            }`}
          >
            {item}
          </div>
        ))}
      </div>

      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__work-portfolio"
      >
        {filterCert.map((cert, index) => (
          <div className="app__work-item app__flex" key={index}>
            <div className="app__work-img app__flex">
              <img src={cert.imgUrl} alt={cert.name} />

              <motion.div
                whileHover={{ opacity: [0, 1] }}
                transition={{
                  duration: 0.25,
                  ease: "easeInOut",
                  staggerChildren: 0.5,
                }}
                className="app__work-hover app__flex"
              >
                <a href={cert.certificateLink} target="_blank" rel="noreferrer">
                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [1, 0.9] }}
                    transition={{ duration: 0.25 }}
                    className="app__flex"
                  >
                    <AiFillEye />
                  </motion.div>
                </a>
              </motion.div>
            </div>

            <div className="app__work-content app__flex">
              <h4 className="bold-text">{cert.title}</h4>
              <p className="p-text" style={{ marginTop: 10 }}>
                {cert.description}
              </p>

              <div className="app__work-tag app__flex">
                <p className="p-text">{cert.tags[0]}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Cert, "app__works"),
  "work",
  "app__primarybg"
);
