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
    metrics: {
      conversionRate: "45%",
      pipelineValue: "$2.5M",
      timeframe: "6 months",
    },
    beforeAfter: {
      before: "12 leads/month",
      after: "45 leads/month",
      improvement: "275%",
    },
    industry: "SaaS",
    author: "Sarah Chen",
    position: "Head of Sales",
  },
  {
    company: "Selling to Executives",
    feedbackImg: "/reveiws/24.png",
    metrics: {
      conversionRate: "38%",
      pipelineValue: "$1.8M",
      timeframe: "4 months",
    },
    beforeAfter: {
      before: "8 leads/month",
      after: "32 leads/month",
      improvement: "300%",
    },
    industry: "Tech",
    author: "Michael Ross",
    position: "Sales Director",
  },
  {
    company: "5T Media and Design",
    feedbackImg: "/reveiws/25.png",
    metrics: {
      conversionRate: "35%",
      pipelineValue: "$1.2M",
      timeframe: "3 months",
    },
    beforeAfter: {
      before: "15 leads/month",
      after: "40 leads/month",
      improvement: "167%",
    },
    industry: "Media",

    author: "Jennifer Wu",
    position: "Marketing Manager",
  },
  {
    company: "Avani Media",
    feedbackImg: "/reveiws/26.png",
    metrics: {
      conversionRate: "42%",
      pipelineValue: "$950K",
      timeframe: "3 months",
    },
    beforeAfter: {
      before: "10 leads/month",
      after: "35 leads/month",
      improvement: "250%",
    },
    industry: "Digital Media",

    author: "David Park",
    position: "Business Development Lead",
  },
  {
    company: "MapleDwell",
    feedbackImg: "/reveiws/27.png",
    metrics: {
      conversionRate: "40%",
      pipelineValue: "$1.5M",
      timeframe: "5 months",
    },
    beforeAfter: {
      before: "20 leads/month",
      after: "50 leads/month",
      improvement: "150%",
    },
    industry: "Real Estate",

    author: "Lisa Chen",
    position: "VP of Sales",
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
    }, 5000); // Auto-slide every 3 seconds

    return () => clearInterval(autoSlide);
  }, [testimonials.length]);

  return (
    <>
      {testimonials.length && (
        <>
          <h2 className="head-text">
            Proven <span>Results</span> & <span>Success Stories</span>
          </h2>

          <div className="app__testimonial-item">
            <div className="app__testimonial-header">
              <img
                src={testimonials[currentIndex].feedbackImg}
                alt={testimonials[currentIndex].company}
              />
              <div className="client-info">
                <h3>{testimonials[currentIndex].author}</h3>
                <h4>{testimonials[currentIndex].position}</h4>
                <span className="company-name">
                  {testimonials[currentIndex].company}
                </span>
                <span className="industry-tag">
                  {testimonials[currentIndex].industry}
                </span>
              </div>
            </div>

            <div className="app__testimonial-metrics-container">
              <div className="metrics-row">
                <div className="metric-box">
                  <span className="metric-value">
                    {testimonials[currentIndex].metrics.conversionRate}
                  </span>
                  <span className="metric-label">Success Rate</span>
                </div>
                <div className="metric-box">
                  <span className="metric-value">
                    {testimonials[currentIndex].metrics.pipelineValue}
                  </span>
                  <span className="metric-label">Total Sales Value</span>
                </div>
                <div className="metric-box">
                  <span className="metric-value">
                    {testimonials[currentIndex].beforeAfter.improvement}
                  </span>
                  <span className="metric-label">Overall Increase</span>
                </div>
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
    </>
  );
};

export default AppWrap(
  MotionWrap(Testimonial, "app__testimonial"),
  "testimonial",
  "app__primarybg"
);
