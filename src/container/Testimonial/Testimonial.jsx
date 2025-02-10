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
      conversionRate: "25%",
      pipelineGenerated: "$205K",
      meetingsBooked: "120",
      avgDealSize: "$50K",
    },
    beforeAfter: {
      before: "15 meetings/month",
      after: "40 meetings/month",
      improvement: "167%",
    },
    industry: "SaaS",
    author: "Sarah Chen",
    position: "Head of Sales",
  },
  {
    company: "Selling to Executives",
    feedbackImg: "/reveiws/24.png",
    metrics: {
      conversionRate: "22%",
      pipelineGenerated: "$108K",
      meetingsBooked: "90",
      avgDealSize: "$45K",
    },
    beforeAfter: {
      before: "10 meetings/month",
      after: "30 meetings/month",
      improvement: "200%",
    },
    industry: "Tech",
    author: "Michael Ross",
    position: "Sales Director",
  },
  {
    company: "5T Media and Design",
    feedbackImg: "/reveiws/25.png",
    metrics: {
      conversionRate: "20%",
      pipelineGenerated: "$120K",
      meetingsBooked: "75",
      avgDealSize: "$40K",
    },
    beforeAfter: {
      before: "12 meetings/month",
      after: "25 meetings/month",
      improvement: "108%",
    },
    industry: "Media",
    author: "Jennifer Wu",
    position: "Marketing Manager",
  },
  {
    company: "Avani Media",
    feedbackImg: "/reveiws/26.png",
    metrics: {
      conversionRate: "28%",
      pipelineGenerated: "$950K",
      meetingsBooked: "60",
      avgDealSize: "$35K",
    },
    beforeAfter: {
      before: "8 meetings/month",
      after: "20 meetings/month",
      improvement: "150%",
    },
    industry: "Digital Media",
    author: "David Park",
    position: "Business Development Lead",
  },
  {
    company: "MapleDwell",
    feedbackImg: "/reveiws/27.png",
    metrics: {
      conversionRate: "30%",
      pipelineGenerated: "$154k",
      meetingsBooked: "100",
      avgDealSize: "$55K",
    },
    beforeAfter: {
      before: "18 meetings/month",
      after: "35 meetings/month",
      improvement: "94%",
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
    }, 5000); // Auto-slide every 5 seconds

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
                  <span className="metric-label">Conversion Rate</span>
                </div>
                <div className="metric-box">
                  <span className="metric-value">
                    {testimonials[currentIndex].metrics.pipelineGenerated}
                  </span>
                  <span className="metric-label">Pipeline Generated</span>
                </div>
                <div className="metric-box">
                  <span className="metric-value">
                    {testimonials[currentIndex].metrics.meetingsBooked}
                  </span>
                  <span className="metric-label">Meetings Booked</span>
                </div>
                <div className="metric-box">
                  <span className="metric-value">
                    {testimonials[currentIndex].metrics.avgDealSize}
                  </span>
                  <span className="metric-label">Average Deal Size</span>
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
